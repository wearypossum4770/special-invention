// import {randomUUID} from 'crypto'
// // isDeleted: true,
// // isArchived: false,

// const data = []

function logDecorator(wrapped) {
  const controller = new AbortController();

  return function decorator(...args) {
    const start = performance.now();
    const result = wrapped.apply(this, args);
    const end = performance.now();
    const time = end - start;
    const now = Date.now();
    console.log({
      passive: true,
      signal: controller.signal,
      result,
      start,
      end,
      time,
      now,
    });
  };
}
