export function getData() {
  let data = [];
  for(let i = 0; i < 10000; i = i + 7) {
    data.push({
      id: i,
      label: '火锅' + i,
      value: i,
      level: 1,
      children: [
        {
          id: i + 1,
          label: '三鲜火锅' + i,
          value: 100001,
          level: 10002
        },
        {
          id: i + 2,
          label: '鸳鸯锅' + i,
          value: 2,
          level: 2
        },
        {
          id: i + 3,
          label: '麻辣锅' + i,
          value: 3,
          level: 2
        },
        {
          id: i + 4,
          label: '魔鬼辣锅' + i,
          value: 4,
          level: 2
        },
        {
          id: i + 5,
          label: '菌菇锅' + i,
          value: 5,
          level: 2
        }
      ]
    })
  }
  return data;
}