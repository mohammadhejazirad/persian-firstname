import PersianName from '../src/index';

const get_names = PersianName.getNames({
  myTypeGender: {
    male: 'جناب آقای',
    female: 'سر کار خانم',
    both: 'جناب آقای 2',
  },
  limitation: {
    limit: 100,
    offset: 10,
  },
});

console.log(get_names);

// const findName = PersianName.findName('سارا', {
//   myTypeGender: {
//     male: '🥸',
//     female: '🥰',
//     both: '💀',
//   },
// });

// console.log(findName);

// const findName = PersianName.getGenderName('علیرضا', {
//   myTypeGender: {
//     male: '🥸',
//     female: '🥰',
//     both: '💀',
//   },
// });

// console.log(findName);
