const cardsObserverOptions = {
  root: null, 
  rootMargin: "100px",
  threshold: 0.2
};

function cardsObserverCallback(entries, cardsObserver) {
  entries.forEach((entry) => {
    if ( entry.isIntersecting ) {
      entry.target.classList.replace("bt_bb_moving_card_item_passive", "bt_bb_moving_card_item_active");
    } else {
      entry.target.classList.replace("bt_bb_moving_card_item_active", "bt_bb_moving_card_item_passive");
    }
  });
}

const fadeInElms = document.querySelectorAll(".bt_bb_moving_card_item");

const cardsObserver = new IntersectionObserver(cardsObserverCallback, cardsObserverOptions);
fadeInElms.forEach((el) => cardsObserver.observe(el));