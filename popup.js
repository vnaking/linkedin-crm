const inputWelcomeMsgVi = document.querySelector('#inputWelcomeMsgVi');
const inputWelcomeMsgEn = document.querySelector('#inputWelcomeMsgEn');
const inputInvitationMsgVi = document.querySelector('#inputInvitationMsgVi');
const inputInvitationMsgEn = document.querySelector('#inputInvitationMsgEn');
const inputContentLib = document.querySelector('#inputContentLib');
let inputWelcomeTemplate = {
  en: '',
  vi: ''
};
let inputInvitationTemplate = {
  en: '',
  vi: ''
};
let inputContentLibTemplate;

const saveBtn = document.querySelector('#saveBtn');

const saveTemplate = function () {
  inputWelcomeTemplate.en = inputWelcomeMsgEn.value;
  inputWelcomeTemplate.vi = inputWelcomeMsgVi.value;
  inputInvitationTemplate.en = inputInvitationMsgEn.value;
  inputInvitationTemplate.vi = inputInvitationMsgVi.value;
  inputContentLibTemplate = inputContentLib.value;
  chrome.storage.sync.set({
      inputWelcomeTemplate: JSON.stringify(inputWelcomeTemplate),
      inputInvitationTemplate: JSON.stringify(inputInvitationTemplate),
      inputContentLibTemplate: JSON.stringify(inputContentLibTemplate),
    },
    function () {}
  );
};

saveBtn.addEventListener('click', saveTemplate);

window.onload = function () {
  chrome.storage.sync.get(['inputWelcomeTemplate'], function (result) {
    if (!result) {
      chrome.storage.sync.set({
          inputWelcomeTemplate: JSON.stringify(inputWelcomeTemplate)
        },
        function () {}
      );
    } else {
      inputWelcomeTemplate = JSON.parse(result.inputWelcomeTemplate);
      inputWelcomeMsgVi.value = inputWelcomeTemplate.vi;
      inputWelcomeMsgEn.value = inputWelcomeTemplate.en;
    }
  });
  chrome.storage.sync.get(['inputInvitationTemplate'], function (result) {
    if (!result) {
      chrome.storage.sync.set({
          inputInvitationTemplate: JSON.stringify(inputInvitationTemplate)
        },
        function () {}
      );
    } else {
      inputInvitationTemplate = JSON.parse(result.inputInvitationTemplate);
      inputInvitationMsgVi.value = inputInvitationTemplate.vi;
      inputInvitationMsgEn.value = inputInvitationTemplate.en;
    }
  });
  chrome.storage.sync.get(['inputContentLibTemplate'], function (result) {
    if (!result) {
      chrome.storage.sync.set({
          inputContentLibTemplate: JSON.stringify(inputContentLibTemplate)
        },
        function () {}
      );
    } else {
      inputContentLibTemplate = JSON.parse(result.inputContentLibTemplate);
      inputContentLib.value = inputContentLibTemplate;
    }
  });
};