import qs from 'qs';

const $ = window.$;

export default function () {
  let search = window.location.search;
  if (search && search.length > 0) {
    search = search.substr(1);
    const searchObj = qs.parse(search);
    const q = searchObj.q;
    if (q && q.length > 0) {
      // 判断q是否合法
      $.ajax(`/addresses/${q}.json`).done((data) => {
        if (data && data.eth) {
          $('#inviteArea').css('display', 'block');
          $('#noinvitep').css('display', 'none');
          $('#invitep').css('display', 'block');
          $('#inviteAddress').html(data.eth);
          $('#getCode').html('获取邀请链接及TG邀请命令');
          window.__Q__ = q;
        }
      });
    }
  }
}
