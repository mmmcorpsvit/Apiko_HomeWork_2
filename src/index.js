// https://habr.com/ru/post/173447/
// https://books.google.com.ua/books?id=p7uyWPcVGZsC&pg=PA189&lpg=PA189&dq=%22%27span%27,+undefined,+%27Hello+world%27),%22&source=bl&ots=x99HHvS_qM&sig=ACfU3U1t2MLAVsnuZsHrC5ekaGUUhhuzMg&hl=ru&sa=X&ved=2ahUKEwjsxtjt6pvlAhXq6aYKHe5nCW0Q6AEwAHoECAcQAQ#v=onepage&q=%22'span'%2C%20undefined%2C%20'Hello%20world')%2C%22&f=false
// http://sqrtt.pro/trampolines-in-javascript-ru
// https://ru.stackoverflow.com/questions/551123/%D0%A5%D0%B2%D0%BE%D1%81%D1%82%D0%BE%D0%B2%D0%B0%D1%8F-%D1%80%D0%B5%D0%BA%D1%83%D1%80%D1%81%D0%B8%D1%8F-js

// region 'helpers'
function _createProps(el, props) {
  if (typeof props !== 'object') {
    return null;
  }

  for (let keyProp in props) {
    let key = keyProp;
    let val = props[keyProp];

    // subattribute, example: { style: { backgroundColor: 'red' } }
    if (typeof val === 'object') {
      for (let subkeyProp in val) {
        el[key][subkeyProp] = val[subkeyProp];
      }
    } else {
      el[key] = val;
    }
  }
}

function _createTextNode(type) {
  return document.createTextNode(type);
}

function _isElement(element) {
  return (
    element instanceof Element || element instanceof HTMLDocument
  );
}

function _isString(element) {
  return typeof element === 'string' || element instanceof String;
}
// endregion

function createElement(type, props, children) {
  let el = null;

  // якщо це готовий елемент, то зразу повертаэмо його
  if (_isElement(type)) {
    el = type;
  } else {
    el = document.createElement(type);
    _createProps(el, props);
  }

  // child is text
  if (_isString(children)) {
    el.appendChild(_createTextNode(children));
  }

  if (Array.isArray(children)) {
    for (const chield in children) {
      const params = children[chield];

      // chield is text
      if (_isString(params)) {
        el.appendChild(_createTextNode(params));
      } else {
        el.appendChild(createElement(params));
      }
    }
  }

  return el;
}

// todo: рекурсия, внутр. параметри ???

function render(element, parent) {
  // потрібно реалізувати
  if (_isElement(element)) {
    parent.appendChild(element);
  }
}

const React = {
  createElement,
  render,
};

const app = React.createElement(
  'div',
  { style: { backgroundColor: 'red' } },
  [
    React.createElement('span', undefined, 'Hello world'),
    React.createElement('br'),
    'This is just a text node',
    React.createElement('div', { textContent: 'Text content' }),
  ],
);

// const app = React.createElement("div", { style: { backgroundColor: 'red' } });
// const app = React.createElement('span', undefined, 'Hello world');
// const app = React.createElement('div',
//   {
//     className: 'super-puper-text',
//     style: { backgroundColor: 'red', color: 'blue' },
//   },
//   'test...');
// const app = React.createElement('This is just a text node');
// const app = React.createElement('br');

React.render(app, document.getElementById('app'));
