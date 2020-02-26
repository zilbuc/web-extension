let storedCredentials,
  tabUrl;

let myPort = browser.runtime.connect({ name: "login-saviour-port-from-cs" });

myPort.onMessage.addListener(msg => {
  if (msg.creds) {
    storedCredentials = msg.creds;
    tabUrl = msg.url;

    openPinModal();
  } else {
    alert('No credentials stored!');
  }
});

const decryptPassword = (password, pin) => {
  const decryptedPassword = CryptoJS.AES.decrypt(password, pin).toString(CryptoJS.enc.Utf8);
  return decryptedPassword.length > 0 ? decryptedPassword : password;
};

const findLoginForm = (url, creds, pin) => {
  switch (url) {
    case constants.redditUrl:
      loginToReddit(constants.urls[url], creds, pin);
      break;
    default:
      loginToSite(constants.urls[url], creds, pin);
  }
};

const loginToSite = (url, creds, pin) => {
  const userNode = document.getElementById(url.userNodeId);
  userNode.value = creds.username;

  const passNode = document.getElementById(url.passNodeId);
  passNode.value = decryptPassword(creds.password, pin);

  const submitButton = document.querySelector(url.submitSelector);
  submitButton.click();
};

const loginToReddit = (url, creds, pin) => {
  const openLoginForm = document.querySelector(constants.redditLoginForm);
  openLoginForm.click();

  let count = 0;
  const intervalId = setInterval(() => {
    const frame = document.getElementsByTagName('iframe');

    for (let i = 0; i < frame.length; i++) {
      if (frame[i].src === constants.redditUrl + 'login/') {
        const userNode = frame[i].contentDocument.getElementById(url.userNodeId);
        userNode.value = creds.username;
        const passNode = frame[i].contentDocument.getElementById(url.passNodeId);
        passNode.value = decryptPassword(creds.password, pin);
        const submitButton = frame[i].contentDocument.querySelector(url.submitSelector);
        submitButton.click();

        clearInterval(intervalId);
      }
    }

    count++;
    if (count === 10) {
      clearInterval(intervalId);
    }
  }, 1000);
};

const openPinModal = () => {

  const existingModal = document.getElementById(constants.modalId);

  if (!existingModal) {
    createModal();
  } else {
    existingModal.style.display = 'block';

    const pinInput = document.querySelector(constants.pinInputSelector);
    pinInput.focus();
  }

};

const createModal = () => {
  const modal = document.createElement('div'),
    modalStyle = document.createElement('style'),
    theBody = document.getElementsByTagName('body')[0],
    theHead = document.getElementsByTagName('head')[0];

  modal.setAttribute('class', 'loginSaviour-modal');
  modal.setAttribute('id', constants.modalId);
  modal.innerHTML = constants.modalHTML;
  theBody.appendChild(modal);

  if (modalStyle.styleSheet) {
    modalStyle.styleSheet.cssText = constants.modalCSS;
  } else {
    modalStyle.appendChild(document.createTextNode(constants.modalCSS));
  }
  theHead.appendChild(modalStyle);


  const modalForm = document.querySelector('.loginSaviour-modal-content');
  const pinInput = document.querySelector(constants.pinInputSelector);
  pinInput.focus();

  if (modalForm) {
    modalForm.addEventListener('submit', event => {
      event.stopPropagation();
      event.preventDefault();
      const pin = event.target.elements[0].value;

      modal.style.display = 'none';

      findLoginForm(tabUrl, storedCredentials, pin);

      pinInput.value = '';
    });
  }

  window.onclick = event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
};

const constants = {
  redditUrl: 'https://www.reddit.com/',
  redditLoginForm: `[href='https://www.reddit.com/login/?dest=https%3A%2F%2Fwww.reddit.com%2F']`,
  modalId: 'loginSaviour-modal',
  pinInputSelector: 'input.loginSaviour',
  modalHTML: `<span class="loginSaviour-close" title="Close Modal" onclick="document.getElementById('loginSaviour-modal').style.display='none'">&times;</span>
  <form class="loginSaviour-modal-content">
    <div class="loginSaviour-container">
      <label for="pin"><b>PIN</b></label>
      <input class="loginSaviour" type="password" placeholder="Enter PIN" name="pin" minlength="4" maxlength="4" required>
  
      <button class="loginSaviour" type="submit">Submit</button>
    </div>
  
    <div class="loginSaviour-container" style="background-color:#f1f1f1">
      <button type="button" class="loginSaviour-cancelbtn" onclick="document.getElementById('loginSaviour-modal').style.display='none'">Cancel</button>
    </div>
  </form>
  </div>
  `,
  modalCSS: `
  .loginSaviour-container {
    padding: 16px;
  }
  .loginSaviour-modal {
    display: block;
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
    padding-top: 60px;
  }
  .loginSaviour-modal-content {
    background-color: #fefefe;
    margin: 5px auto;
    border: 1px solid #888;
    margin-top: 30%;
    width: 40%;
    z-index: 999;
  }
  input[type=password].loginSaviour {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  button.loginSaviour {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;

    &::hover {
      opacity: 0.8;
    }
  }
  .loginSaviour-cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
  }
  .loginSaviour-close {
    position: absolute;
    right: 25px;
    top: 0;
    color: #000;
    font-size: 35px;
    font-weight: bold;

    &:hover, focus {
      color: red;
      cursor: pointer;
    }
  }`,
  urls: {
    'https://www.facebook.com/': {
      userNodeId: 'email',
      passNodeId: 'pass',
      submitSelector: '[data-testid="royal_login_button"]',
    },
    'https://www.reddit.com/': {
      userNodeId: 'loginUsername',
      passNodeId: 'loginPassword',
      submitSelector: 'body > div > div > div.PageColumn.PageColumn__right > div > form > fieldset:nth-child(12) > button.AnimatedForm__submitButton',
    },
    'https://store.steampowered.com/login': {
      userNodeId: 'input_username',
      passNodeId: 'input_password',
      submitSelector: '#login_btn_signin > button',
    },
    'https://signin.ebay.com/signin/': {
      userNodeId: 'userid',
      passNodeId: 'pass',
      submitSelector: '#sgnBt',
    }
  }
};