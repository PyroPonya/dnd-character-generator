export const useDnData = () =>
  useState('dndData', () => {
    const dndData = {};
    const names = [
      'background',
      'class',
      'events',
      'life',
      'race',
      'secrets',
      'traitsIdealsBondsFlaws',
    ];
    for (let nameId in names) {
      fetch(`/assets/data/${names[nameId]}.json`)
        .then((resp) => resp.json())
        .then((data) => {
          dndData[`${names[nameId]}`] = data;
        });
    }
    return dndData;
  });
