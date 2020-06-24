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
  const ptnInviteAddNote = 'button[aria-label="Add a note"]';
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
    console.log('start copyContent');
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
  const correctVietnamName = function (name) {
    console.log('start correctVietnamName');
    let temp = name.toLowerCase();
    switch (temp) {
      case 'binh':
        temp = 'bình';
        break;
      case 'cuc':
        temp = 'cúc';
        break;
      case 'duc':
        temp = 'đức';
        break;
      case 'dao':
        temp = 'đào';
        break;
        case 'dat':
          temp = 'đạt';
          break;
      case 'dang':
        temp = 'đăng';
        break;
      case 'ha':
        temp = 'hà';
        break;
        case 'hai':
          temp = 'hải';
          break;
      case 'hao':
        temp = 'hảo';
        break;
      case 'hong':
        temp = 'hồng';
        break;
      case 'hoan':
        temp = 'hoàn';
        break;
      case 'hoang':
        temp = 'hoàng';
        break;
      case 'son':
        temp = 'sơn';
        break;
      case 'huan':
        temp = 'huân';
        break;
        case 'hung':
          temp = 'hùng';
          break;
      case 'huong':
        temp = 'hương';
        break;
      case 'huyên':
        temp = 'huyền';
        break;
      case 'hien':
        temp = 'hiền';
        break;
      case 'hieu':
        temp = 'hiếu';
        break;
      case 'hang':
        temp = 'hằng';
        break;
      case 'hanh':
        temp = 'hạnh';
        break;
      case 'van':
        temp = 'vân';
        break;
      case 'vu':
        temp = 'vũ';
        break;
      case 'viet':
        temp = 'việt';
        break;
      case 'tai':
        temp = 'tài';
        break;
      case 'tan':
        temp = 'tân';
        break;
      case 'tra':
        temp = 'trà';
        break;
      case 'tram':
        temp = 'trâm';
        break;
      case 'tran':
        temp = 'trân';
        break;
      case 'tri':
        temp = 'trí';
        break;
      case 'trieu':
        temp = 'triều';
        break;
      case 'truc':
        temp = 'trúc';
        break;
        case 'trong':
          temp = 'trọng';
          break;
      case 'tien':
        temp = 'tiên';
        break;
      case 'tuan':
        temp = 'tuấn';
        break;
      case 'tung':
        temp = 'tùng';
        break;
      case 'thang':
        temp = 'thắng';
        break;
      case 'thao':
        temp = 'thảo';
        break;
      case 'thai':
        temp = 'thái';
        break;
      case 'thach':
        temp = 'thạch';
        break;
      case 'thinh':
        temp = 'thịnh';
        break;
      case 'thuan':
        temp = 'thuận';
        break;
      case 'thuat':
        temp = 'thuật';
        break;
      case 'thuy':
        temp = 'thuỷ';
        break;
      case 'tu':
        temp = 'tú';
        break;
      case 'tuyen':
        temp = 'tuyền';
        break;
        case 'tuyet':
          temp = 'tuyết';
          break;
      case 'duong':
        temp = 'dương';
        break;
      case 'diem':
        temp = 'diễm';
        break;
      case 'dong':
        temp = 'đông';
        break;
      case 'cam':
        temp = 'cẩm';
        break;
        case 'chau':
          temp = 'châu';
          break;
      case 'cong':
        temp = 'công';
        break;
      case 'yen':
        temp = 'yến';
        break;
      case 'ngoc':
        temp = 'ngọc';
        break;
      case 'nuong':
        temp = 'nương';
        break;
      case 'ngan':
        temp = 'ngân';
        break;
      case 'nguyen':
        temp = 'nguyên';
        break;
      case 'nguyet':
        temp = 'nguyệt';
        break;
      case 'nhu':
        temp = 'Như';
        break;
      case 'nhut':
        temp = 'Nhựt';
        break;
      case 'khiem':
        temp = 'khiêm';
        break;
      case 'kieu':
        temp = 'kiều';
        break;
        case 'kien':
          temp = 'kiên';
          break;
      case 'lai':
        temp = 'lài';
        break;
      case 'loc':
        temp = 'lộc';
        break;
        case 'luong':
          temp = 'lượng';
          break;
      case 'le':
        temp = 'lê';
        break;
      case 'lien':
        temp = 'liên';
        break;
      case 'phat':
        temp = 'phát';
        break;
      case 'phu':
        temp = 'phú';
        break;
      case 'phung':
        temp = 'phụng';
        break;

    }

    temp = temp.replace('huon', 'hươn');
    temp = temp.replace('cuon', 'cườn');
    temp = temp.replace('uynh', 'uỳnh');
    temp = temp.replace('uye', 'uyê');
    temp = temp.replace('ieu', 'iếu');
    temp = temp.replace('phuc', 'phúc');
    temp = temp.replace('iet', 'iệt');
    temp = temp.replace('iep', 'iệp');
    temp = temp.replace('hao', 'hảo');
    temp = temp.replace('uoc', 'ước');
    temp = temp.replace('uan', 'uân');
    temp = temp.replace('oan', 'oàn');

    return temp.charAt(0).toUpperCase() + temp.slice(1);
  }
  const splittedName = function (fullName) {
    console.log('start splittedName');
    let fullNameArr, firstName, lastName;
    let temp = {
      firstName: '',
      lastName: ''
    };
    if (!fullName || !fullName.length) {
      return temp;
    }
    fullNameArr = fullName.trim().split(' ');
    firstName = fullNameArr[0];
    lastName = fullNameArr[fullNameArr.length - 1];
    temp.firstName = correctVietnamName(firstName);
    temp.lastName = correctVietnamName(lastName);
    return temp;
  };
  const generateBtnCreateAcceptContent = function (btnText, parent) {
    console.log('start generateBtnCreateAcceptContent');
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
  const generateAcceptContent = function (
    name,
    lang,
    isMr,
    isFirstNameInTheEnd
  ) {
    console.log('start generateAcceptContent');
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
          .replace(/mình/g, 'em')
          .replace(/Mình/g, 'Em')
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
    const acceptMsgComposeSendBtnEl = document.querySelector(
      acceptMsgComposeSendBtn
    );
    const name = splittedName(fullName.innerText);
    const actionParent = document.querySelector(acceptMsgComposeActions);

    btnCreateAcceptContentVi = generateBtnCreateAcceptContent(
      name.firstName + '🇻🇳',
      actionParent
    );
    btnCreateAcceptContentVi.addEventListener('click', function () {
      console.log('generateAcceptContent ' + name + ' vi');
      generateAcceptContent(name, 'vi', false, false);
      setTimeout(function () {
        if (!acceptMsgComposeInputEl) {
          return;
        }
        acceptMsgComposeInputEl.value = inputWelcomeValue;
      }, viewDelay);
    });

    btnCreateAcceptContentViFirstnameEnd = generateBtnCreateAcceptContent(
      name.lastName + '🇻🇳',
      actionParent
    );
    btnCreateAcceptContentViFirstnameEnd.addEventListener('click', function () {
      console.log('generateAcceptContent ' + name + ' vi');
      generateAcceptContent(name, 'vi', false, true);
      setTimeout(function () {
        if (!acceptMsgComposeInputEl) {
          return;
        }
        acceptMsgComposeInputEl.value = inputWelcomeValue;
      }, viewDelay);
    });

    btnCreateAcceptContentViMr = generateBtnCreateAcceptContent(
      'Anh ' + name.firstName + '🇻🇳',
      actionParent
    );
    btnCreateAcceptContentViMr.addEventListener('click', function () {
      console.log('generateAcceptContent ' + name + ' vi');
      generateAcceptContent(name, 'vi', true, false);
      setTimeout(function () {
        if (!acceptMsgComposeInputEl) {
          return;
        }
        acceptMsgComposeInputEl.value = inputWelcomeValue;
      }, viewDelay);
    });

    btnCreateAcceptContentViFirstnameEnd = generateBtnCreateAcceptContent(
      'Anh ' + name.lastName + '🇻🇳',
      actionParent
    );
    btnCreateAcceptContentViFirstnameEnd.addEventListener('click', function () {
      console.log('generateAcceptContent ' + name + ' vi');
      generateAcceptContent(name, 'vi', true, true);
      setTimeout(function () {
        if (!acceptMsgComposeInputEl) {
          return;
        }
        acceptMsgComposeInputEl.value = inputWelcomeValue;
      }, viewDelay);
    });

    btnCreateAcceptContentEn = generateBtnCreateAcceptContent(
      name.firstName + '🇺🇸',
      actionParent
    );
    btnCreateAcceptContentEn.addEventListener('click', function () {
      console.log('generateAcceptContent ' + name + ' en');
      generateAcceptContent(name, 'en', false, false);
      setTimeout(function () {
        if (!acceptMsgComposeInputEl) {
          return;
        }
        acceptMsgComposeInputEl.value = inputWelcomeValue;
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
            inputInvitationTemplate = JSON.parse(
              result.inputInvitationTemplate
            );
          }
          inputInvitationValue = inputInvitationTemplate['en']
            .replace(/{{firstName}}/g, name.firstName)
            .replace(/{{lastName}}/g, name.lastName);
          const customMessageEl = document.querySelector(ptnCustomMessage);
          if (customMessageEl) {
            customMessageEl.value = inputInvitationValue;
          }
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

  const fullNameSelector = 'artdeco-entity-lockup-title';

  document.arrive(bubbleChatWindow, function () {
    console.log('arrive: ', bubbleChatWindow);
    // const acceptMsgComposeSendBtnEl = this.querySelector('.msg-form__send-button');
    let fullNameEl = this.querySelector(
      fullNameSelector
    );
    if (fullNameEl) {
      fullName = fullNameEl.innerText
    } else {
      fullName = this.querySelector(
        '.msg-connections-typeahead__added-recipients .artdeco-pill__text'
      ).innerText;
    }
    let acceptMsgComposeInputEl = this.querySelector(
      '.msg-form__contenteditable'
    );
    const actionParent = this.querySelector('.msg-form__footer');
    const name = splittedName(fullName);
    let paragraph;

    btnCreateAcceptContentVi = generateBtnCreateAcceptContent(
      name.firstName + '🇻🇳',
      actionParent
    );
    btnCreateAcceptContentVi.addEventListener('click', function () {
      console.log('generateAcceptContent ' + name + ' vi');
      generateAcceptContent(name, 'vi', false, false);
      setTimeout(function () {
        paragraph = document.createElement('p');
        if (!inputWelcomeValue) {
          alert('Template content not found!');
          return;
        }
        acceptMsgComposeInputEl.innerHTML = '';
        paragraph.innerHTML = inputWelcomeValue.replace(
          /(?:\r\n|\r|\n)/g,
          '<br>'
        );
        acceptMsgComposeInputEl.appendChild(paragraph);
      }, viewDelay);
    });

    btnCreateAcceptContentViFirstnameEnd = generateBtnCreateAcceptContent(
      name.lastName + '🇻🇳',
      actionParent
    );
    btnCreateAcceptContentViFirstnameEnd.addEventListener('click', function () {
      console.log('generateAcceptContent ' + name + ' vi');
      generateAcceptContent(name, 'vi', false, true);
      setTimeout(function () {
        paragraph = document.createElement('p');
        if (!inputWelcomeValue) {
          alert('Template content not found!');
          return;
        }
        acceptMsgComposeInputEl.innerHTML = '';
        paragraph.innerHTML = inputWelcomeValue.replace(
          /(?:\r\n|\r|\n)/g,
          '<br>'
        );
        acceptMsgComposeInputEl.appendChild(paragraph);
      }, viewDelay);
    });

    btnCreateAcceptContentViMr = generateBtnCreateAcceptContent(
      'Anh ' + name.firstName + '🇻🇳',
      actionParent
    );
    btnCreateAcceptContentViMr.addEventListener('click', function () {
      console.log('generateAcceptContent ' + name + ' vi');
      generateAcceptContent(name, 'vi', true, false);
      setTimeout(function () {
        paragraph = document.createElement('p');
        if (!inputWelcomeValue) {
          alert('Template content not found!');
          return;
        }
        acceptMsgComposeInputEl.innerHTML = '';
        paragraph.innerHTML = inputWelcomeValue.replace(
          /(?:\r\n|\r|\n)/g,
          '<br>'
        );
        acceptMsgComposeInputEl.appendChild(paragraph);
      }, viewDelay);
    });

    btnCreateAcceptContentViFirstnameEnd = generateBtnCreateAcceptContent(
      'Anh ' + name.lastName + '🇻🇳',
      actionParent
    );
    btnCreateAcceptContentViFirstnameEnd.addEventListener('click', function () {
      console.log('generateAcceptContent ' + name + ' vi');
      generateAcceptContent(name, 'vi', true, true);
      setTimeout(function () {
        paragraph = document.createElement('p');
        if (!inputWelcomeValue) {
          alert('Template content not found!');
          return;
        }
        acceptMsgComposeInputEl.innerHTML = '';
        paragraph.innerHTML = inputWelcomeValue.replace(
          /(?:\r\n|\r|\n)/g,
          '<br>'
        );
        acceptMsgComposeInputEl.appendChild(paragraph);
      }, viewDelay);
    });

    btnCreateAcceptContentEn = generateBtnCreateAcceptContent(
      name.firstName + '🇺🇸',
      actionParent
    );
    btnCreateAcceptContentEn.addEventListener('click', function () {
      console.log('generateAcceptContent ' + name + ' en');
      generateAcceptContent(name, 'en', false, false);
      setTimeout(function () {
        paragraph = document.createElement('p');
        if (!inputWelcomeValue) {
          alert('Template content not found!');
          return;
        }
        acceptMsgComposeInputEl.innerHTML = '';
        paragraph.innerHTML = inputWelcomeValue.replace(
          /(?:\r\n|\r|\n)/g,
          '<br>'
        );
        acceptMsgComposeInputEl.appendChild(paragraph);
      }, viewDelay);
    });
  });
};