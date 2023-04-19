import Component from "../../../core/Component.js";
import { store } from "../../../store/store.js";

export default class NewsContent extends Component {
  setEvent() {
    const { addSubscribing, removeSubscribing, press } =
      store.getState().contents;

    const toggleSubscribing = () => {
      if (!press) return;
      const name = press.name;

      this.state.isSubscribing ? removeSubscribing(name) : addSubscribing(name);

      this.setState({
        isSubscribing: !this.state.isSubscribing,
      });
    };

    this.addEvent("click", ".list-button", toggleSubscribing);
  }

  template() {
    const {
      contents: { presses, subscribingPresses, subscriptionOption },
      listView: { index },
    } = store.getState();

    const press = presses[index];

    if (!press && subscriptionOption === "sub")
      return `<span>구독한 언론사가 없습니다.</span>`;
    if (!press) return `<span>loading...</span>`;

    const isSubscribing = subscribingPresses.some(
      (subscribingPress) => subscribingPress === presses[index].name
    );

    const {
      logo_src,
      edit_time,
      main_news_image,
      main_news_title,
      sub_news_titles,
      name,
    } = press;

    const listHtml = sub_news_titles.reduce(
      (listString, title) => listString + `<li>${title}</li>`,
      ""
    );

    return `
        <div class="press-info">
            <img src= "${logo_src}"/>
            <span>${edit_time}</span>
            <button class="list-button">${
              isSubscribing ? "해지하기" : "구독하기"
            }</button>
        </div>
        <div class="newses">
            <div class="main-news">
                <img class="thumbnail" src="${main_news_image}" />
                <span>${main_news_title}</span>
            </div>
            <div>
                <ul class="sub-news">
                  ${listHtml}
                </ul>
                <span class="caption">${name} 언론사에서 직접 편집한 뉴스입니다.</span>
            </div>
        </div>

    `;
  }
}