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
  const splittedName = function (fullName, isFirstNameInTheEnd) {
    let firstName, lastName;
    let temp = {
      firstName: '',
      lastName: ''
    }
    if (!fullName || !fullName.length) {
      return temp;
    }
    let fullNameArr = fullName.trim().split(' ');
    if (isFirstNameInTheEnd) {
      firstName = fullNameArr[fullNameArr.length - 1];
      lastName = fullNameArr[0];
    } else {
      firstName = fullNameArr[0];
      lastName = fullNameArr[fullNameArr.length - 1];
    }
    temp.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    temp.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    return temp;
  }
  /************************************
   ********* Accept message ********
   ************************************/
  const generateBtnCreateAcceptContent = function (text) {
    var btn = document.createElement('a');
    btn.classList = 'msg-form__send-button button-primary-small rr-btn-xs';
    btn.innerText = text;
    acceptActionsElements = document.querySelector(acceptMsgComposeActions);
    if (acceptActionsElements) {
      acceptActionsElements.appendChild(btn);
    }
    return btn;
  };

  const generateAcceptContent = function (lang, isMr, isFirstNameInTheEnd) {
    let acceptMsgComposeFullNameEl = document.querySelector(acceptMsgComposeFullName);
    let acceptMsgComposeInputEl = document.querySelector(acceptMsgComposeInput);
    let acceptMsgComposeSendBtnEl = document.querySelector(acceptMsgComposeSendBtn);
    if (!acceptMsgComposeFullNameEl) return;
    const name = splittedName(acceptMsgComposeFullNameEl.innerText, isFirstNameInTheEnd);
    chrome.storage.sync.get(['inputWelcomeTemplate'], function (result) {
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
          .replace(/{{firstName}}/g, 'anh ' + name.firstName)
          .replace(/bạn/g, 'anh')
          .replace(/{{lastName}}/g, name.lastName);
      } else {
        inputWelcomeValue = inputWelcomeTemplate[lang]
          .replace(/{{firstName}}/g, name.firstName)
          .replace(/{{lastName}}/g, name.lastName);
      }
      acceptMsgComposeInputEl.value = inputWelcomeValue;
      acceptMsgComposeSendBtnEl.disabled = false;
    });
  };
  document.arrive(acceptMsgComposePtn, function () {
    console.log('arrive: ', acceptMsgComposePtn);
    let acceptMsgComposeFullNameEl = document.querySelector(acceptMsgComposeFullName);
    if (!acceptMsgComposeFullNameEl) return;
    const isFirstNameInTheEnd = false;
    const name = splittedName(acceptMsgComposeFullNameEl.innerText, isFirstNameInTheEnd);

    btnCreateAcceptContentVi = generateBtnCreateAcceptContent(name.firstName + '(vi)');
    btnCreateAcceptContentVi.addEventListener('click', function () {
      generateAcceptContent('vi', false, false);
    });

    btnCreateAcceptContentViFirstnameEnd = generateBtnCreateAcceptContent(name.lastName + '(vi)');
    btnCreateAcceptContentViFirstnameEnd.addEventListener('click', function () {
      generateAcceptContent('vi', false, true);
    });

    btnCreateAcceptContentViMr = generateBtnCreateAcceptContent('Anh ' + name.firstName + '(vi)');
    btnCreateAcceptContentViMr.addEventListener('click', function () {
      generateAcceptContent('vi', true, false);
    });

    btnCreateAcceptContentViFirstnameEnd = generateBtnCreateAcceptContent('Anh ' + name.lastName + '(vi)');
    btnCreateAcceptContentViFirstnameEnd.addEventListener('click', function () {
      generateAcceptContent('vi', true, true);
    });

    btnCreateAcceptContentEn = generateBtnCreateAcceptContent(name.firstName + '(en)');
    btnCreateAcceptContentEn.addEventListener('click', function () {
      generateAcceptContent('en', false, false);
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
    let isFirstNameInTheEnd = false;
    const name = splittedName(fullName, isFirstNameInTheEnd);
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
    const fullNamePtn = '.msg-overlay-bubble-header__primary-text';
    const fullName = this.querySelector(fullNamePtn).innerText;

  });
};