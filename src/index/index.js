/* eslint camelcase: 0 */
import Clipboard from 'clipboard';
import md5 from './md5';

const $ = window.$;

function showResultArea(data) {
  $('#inputArea').remove();
  $('#ethAddressResult').html(data.eth);
  const code = `${window.location.origin}${window.location.pathname}?q=${data.invite_code}`;
  $('#codeResult').html(code);
  $('#copyCode').attr('data-clipboard-text', code);
  $('#resultArea').css('display', 'block');

  if (window.__Q__) {
    // 显示command
    $('#commandCard').css('display', 'block');
    const command = `/thanks ${window.__Q__}&${data.invite_code}`;
    $('#commandResult').html(command);
    $('#copyCommand').attr('data-clipboard-text', command);
  }
}

// $(() => {
//   let originData = localStorage.getItem('CANDY');
//   if (originData) {
//     originData = JSON.parse(originData);
//     showResultArea(originData);
//   } else {
//     $('#getCode').click(() => {
//       const address = $('#ethAddress').val();
//       const code = md5(address);
//       const data = {
//         address,
//         code,
//       };
//       localStorage.setItem('CANDY', JSON.stringify(data));
//       showResultArea(data);
//     });
//   }

//   $('#test').click(() => {
//     localStorage.removeItem('CANDY');
//   });
// });


$(() => {
  $('#getCode').click(() => {
    const eth = $('#ethAddress').val();
    const invite_code = md5(eth.toLowerCase());
    const data = {
      eth,
      invite_code,
    };
    $.ajax({
      method: 'POST',
      url: '/addresses.json',
      data,
    }).always((resp) => {
      if (resp.status === 201) {
        showResultArea(data);
      }
    });
  });

  window.clipboard1 = new Clipboard('#copyCode');
  window.clipboard2 = new Clipboard('#copyCommand');
  window.clipboard1.on('success', () => {
    alert('复制成功');
  });
  window.clipboard2.on('success', () => {
    alert('复制成功');
  });
});
