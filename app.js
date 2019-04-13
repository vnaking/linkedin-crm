// [attribute~="value"] attribute value containing a specified word.
// [attribute|="value"] attribute starting with the specified value.
// [attribute^="value"] attribute value begins with a specified value.
// [attribute$="value"] attribute value ends with a specified value.
// [attribute*="value"] attribute value contains a specified value.
window.onload = function () {
  console.log('begin');
  const viewDelay = 100;
  const acceptMsgComposeInput = '.msg-messaging-form__form textarea';
  const acceptMsgComposeSendBtn = '.msg-messaging-form__send-button';
  const acceptMsgComposePtn = '.msg-compose-modal__content';
  const acceptMsgComposeActions = '.msg-messaging-form__left-actions';
  const acceptMsgComposeFullName = '.msg-connections-typeahead__recipient';

  const ptnButtonConnect = 'button[aria-label^="Connect with"]';
  const ptnButtonConnectSingel = '.pv-s-profile-actions--connect';
  const ptnInviteAddNote = 'div.send-invite__actions > button:first-child';
  const ptnCustomMessage = '#custom-message';

  const bubbleChatWindow = '.msg-overlay-conversation-bubble';


  let inputWelcomeValue;
  let inputWelcomeTemplate = {
    en: '',
    vi: ''
  };
  let inputInvitationValue;
  let inputInvitationTemplate = {
    en: '',
    vi: ''
  };
  let acceptActionsElements;
  let btnCreateAcceptContentVi;
  let btnCreateAcceptContentViFirstnameEnd;
  let btnCreateAcceptContentViMr;
  let btnCreateAcceptContentEn;

  const copyContent = function (value) {
    var el = document.createElement('textarea');
    el.value = value;
    el.setAttribute('readonly', '');
    el.style = {
      position: 'absolute',
      width: '0px',
      left: '-9999px'
    };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };
  const splittedName = function (fullName) {
    let fullNameArr, firstName, lastName;
    let temp = {
      firstName: '',
      lastName: ''
    }
    if (!fullName || !fullName.length) {
      return temp;
    }
    fullNameArr = fullName.trim().split(' ');
    firstName = fullNameArr[0];
    lastName = fullNameArr[fullNameArr.length - 1];
    temp.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    temp.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    return temp;
  }
  const generateBtnCreateAcceptContent = function (btnText, parent) {
    var btn = document.createElement('a');
    btn.classList = 'msg-form__send-button button-primary-small rr-btn-xs';
    btn.innerText = btnText;
    if (parent) {
      parent.appendChild(btn);
    }
    return btn;
  };
  /************************************
   ********* Accept message ********
   ************************************/
  const generateAcceptContent = function (name, lang, isMr, isFirstNameInTheEnd) {
    if (!name) return;
    let firstName = name.firstName;
    let lastName = name.lastName;
    if (isFirstNameInTheEnd) {
      firstName = name.lastName;
      lastName = name.firstName;
    }
    return chrome.storage.sync.get(['inputWelcomeTemplate'], function (result) {
      if (!result) {
        chrome.storage.sync.set({
            inputWelcomeTemplate: JSON.stringify(inputWelcomeTemplate)
          },
          function () {}
        );
      } else {
        inputWelcomeTemplate = JSON.parse(result.inputWelcomeTemplate);
      }
      if (lang === 'vi' && isMr) {
        inputWelcomeValue = inputWelcomeTemplate[lang]
          .replace(/{{firstName}}/g, 'anh ' + firstName)
          .replace(/bạn/g, 'anh')
          .replace(/{{lastName}}/g, lastName);
      } else {
        inputWelcomeValue = inputWelcomeTemplate[lang]
          .replace(/{{firstName}}/g, firstName)
          .replace(/{{lastName}}/g, lastName);
      }
    });
  };
  document.arrive(acceptMsgComposePtn, function () {
    console.log('arrive: ', acceptMsgComposePtn);
    let fullName = document.querySelector(acceptMsgComposeFullName);
    if (!fullName) return;
    let acceptMsgComposeInputEl = document.querySelector(acceptMsgComposeInput);
    const acceptMsgComposeSendBtnEl = document.querySelector(acceptMsgComposeSendBtn);
    const name = splittedName(fullName.innerText);
    const actionParent = document.querySelector(acceptMsgComposeActions);

    btnCreateAcceptContentVi = generateBtnCreateAcceptContent(name.firstName + '🇻🇳', actionParent);
    btnCreateAcceptContentVi.addEventListener('click', function () {
      generateAcceptContent(name, 'vi', false, false);
      // acceptMsgComposeSendBtnEl.disabled = true;
      setTimeout(function () {
        acceptMsgComposeInputEl.value = inputWelcomeValue;
        // acceptMsgComposeSendBtnEl.disabled = false;
      }, viewDelay);
    });

    btnCreateAcceptContentViFirstnameEnd = generateBtnCreateAcceptContent(name.lastName + '🇻🇳', actionParent);
    btnCreateAcceptContentViFirstnameEnd.addEventListener('click', function () {
      generateAcceptContent(name, 'vi', false, true);
      // acceptMsgComposeSendBtnEl.disabled = true;
      setTimeout(function () {
        acceptMsgComposeInputEl.value = inputWelcomeValue;
        // acceptMsgComposeSendBtnEl.disabled = false;
      }, viewDelay);
    });

    btnCreateAcceptContentViMr = generateBtnCreateAcceptContent('Anh ' + name.firstName + '🇻🇳', actionParent);
    btnCreateAcceptContentViMr.addEventListener('click', function () {
      generateAcceptContent(name, 'vi', true, false);
      // acceptMsgComposeSendBtnEl.disabled = true;
      setTimeout(function () {
        acceptMsgComposeInputEl.value = inputWelcomeValue;
        // acceptMsgComposeSendBtnEl.disabled = false;
      }, viewDelay);
    });

    btnCreateAcceptContentViFirstnameEnd = generateBtnCreateAcceptContent('Anh ' + name.lastName + '🇻🇳', actionParent);
    btnCreateAcceptContentViFirstnameEnd.addEventListener('click', function () {
      generateAcceptContent(name, 'vi', true, true);
      // acceptMsgComposeSendBtnEl.disabled = true;
      setTimeout(function () {
        acceptMsgComposeInputEl.value = inputWelcomeValue;
        // acceptMsgComposeSendBtnEl.disabled = false;
      }, viewDelay);
    });

    btnCreateAcceptContentEn = generateBtnCreateAcceptContent(name.firstName + '🇺🇸', actionParent);
    btnCreateAcceptContentEn.addEventListener('click', function () {
      generateAcceptContent(name, 'en', false, false);
      // acceptMsgComposeSendBtnEl.disabled = true;
      setTimeout(function () {
        acceptMsgComposeInputEl.value = inputWelcomeValue;
        // acceptMsgComposeSendBtnEl.disabled = false;
      }, viewDelay);
    });
  });

  /************************************
   ********** Invitations msg *********
   ************************************/
  const generateInvitationContent = function (event) {
    let originalNameString = event.target.getAttribute('aria-label');
    if (!originalNameString || !originalNameString.length) {
      const lastSpan = event.target.querySelector('span:last-child');
      if (lastSpan) {
        originalNameString = lastSpan.innerText;
      }
    }
    let fullName = originalNameString.match(/(?<=Connect with\s+).*?(?=\.)/gs);
    if (fullName && fullName.length) {
      fullName = fullName[0];
    } else {
      fullName = originalNameString.replace('Connect with ', '');
    }
    const name = splittedName(fullName);
    setTimeout(function () {
      // click add note
      document.querySelector(ptnInviteAddNote).click();
      // insert content 
      setTimeout(function () {
        chrome.storage.sync.get(['inputInvitationTemplate'], function (result) {
          if (!result) {
            chrome.storage.sync.set({
                inputInvitationTemplate: JSON.stringify(inputInvitationTemplate)
              },
              function () {}
            );
          } else {
            inputInvitationTemplate = JSON.parse(result.inputInvitationTemplate);
          }
          inputInvitationValue = inputInvitationTemplate['en']
            .replace(/{{firstName}}/g, name.firstName)
            .replace(/{{lastName}}/g, name.lastName);
          document.querySelector(ptnCustomMessage).value = inputInvitationValue;
        });
      }, viewDelay);
    }, viewDelay);
  };
  const btnsInvite = document.querySelectorAll(ptnButtonConnect);
  const btnInviteSingle = document.querySelector(ptnButtonConnectSingel);
  for (i = 0, len = btnsInvite.length; i < len; i++) {
    btnsInvite[i].addEventListener('click', generateInvitationContent);
  }
  if (btnInviteSingle) {
    btnInviteSingle.addEventListener('click', generateInvitationContent);
  }
  document.arrive(ptnButtonConnect, function () {
    this.addEventListener('click', generateInvitationContent);
  });
  document.arrive(ptnButtonConnectSingel, function () {
    this.addEventListener('click', generateInvitationContent);
  });

  /************************************
   ************ Bubble chat ***********
   ************************************/

  document.arrive(bubbleChatWindow, function () {
    console.log('arrive: ', bubbleChatWindow);
    const acceptMsgComposeSendBtnEl = this.querySelector('.msg-form__send-button');
    const fullName = this.querySelector('.msg-overlay-bubble-header__primary-text').innerText;
    if (!fullName) return;
    let acceptMsgComposeInputEl = this.querySelector('.msg-form__contenteditable');
    const actionParent = this.querySelector('.msg-form__footer');
    const name = splittedName(fullName);
    let paragraph;

    btnCreateAcceptContentVi = generateBtnCreateAcceptContent(name.firstName + '🇻🇳', actionParent);
    btnCreateAcceptContentVi.addEventListener('click', function () {
      generateAcceptContent(name, 'vi', false, false);
      // acceptMsgComposeSendBtnEl.disabled = true;
      setTimeout(function () {
        paragraph = document.createElement('p');
        paragraph.innerHTML = inputWelcomeValue.replace(/(?:\r\n|\r|\n)/g, '<br>');
        acceptMsgComposeInputEl.appendChild(paragraph);
        // acceptMsgComposeSendBtnEl.disabled = false;
      }, viewDelay);
    });

    btnCreateAcceptContentViFirstnameEnd = generateBtnCreateAcceptContent(name.lastName + '🇻🇳', actionParent);
    btnCreateAcceptContentViFirstnameEnd.addEventListener('click', function () {
      generateAcceptContent(name, 'vi', false, true);
      // acceptMsgComposeSendBtnEl.disabled = true;
      setTimeout(function () {
        paragraph = document.createElement('p');
        paragraph.innerHTML = inputWelcomeValue.replace(/(?:\r\n|\r|\n)/g, '<br>');
        acceptMsgComposeInputEl.appendChild(paragraph);
        // acceptMsgComposeSendBtnEl.disabled = false;
      }, viewDelay);
    });

    btnCreateAcceptContentViMr = generateBtnCreateAcceptContent('Anh ' + name.firstName + '🇻🇳', actionParent);
    btnCreateAcceptContentViMr.addEventListener('click', function () {
      generateAcceptContent(name, 'vi', true, false);
      // acceptMsgComposeSendBtnEl.disabled = true;
      setTimeout(function () {
        paragraph = document.createElement('p');
        paragraph.innerHTML = inputWelcomeValue.replace(/(?:\r\n|\r|\n)/g, '<br>');
        acceptMsgComposeInputEl.appendChild(paragraph);
        // acceptMsgComposeSendBtnEl.disabled = false;
      }, viewDelay);
    });

    btnCreateAcceptContentViFirstnameEnd = generateBtnCreateAcceptContent('Anh ' + name.lastName + '🇻🇳', actionParent);
    btnCreateAcceptContentViFirstnameEnd.addEventListener('click', function () {
      generateAcceptContent(name, 'vi', true, true);
      // acceptMsgComposeSendBtnEl.disabled = true;
      setTimeout(function () {
        paragraph = document.createElement('p');
        paragraph.innerHTML = inputWelcomeValue.replace(/(?:\r\n|\r|\n)/g, '<br>');
        acceptMsgComposeInputEl.appendChild(paragraph);
        // acceptMsgComposeSendBtnEl.disabled = false;
      }, viewDelay);
    });

    btnCreateAcceptContentEn = generateBtnCreateAcceptContent(name.firstName + '🇺🇸', actionParent);
    btnCreateAcceptContentEn.addEventListener('click', function () {
      generateAcceptContent(name, 'en', false, false);
      // acceptMsgComposeSendBtnEl.disabled = true;
      setTimeout(function () {
        paragraph = document.createElement('p');
        paragraph.innerHTML = inputWelcomeValue.replace(/(?:\r\n|\r|\n)/g, '<br>');
        acceptMsgComposeInputEl.appendChild(paragraph);
        // acceptMsgComposeSendBtnEl.disabled = false;
      }, viewDelay);
    });
  });
};