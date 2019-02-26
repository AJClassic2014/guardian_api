import * as moment from 'moment';

export default (data) => {
  let results = [];
  let section = {};
  data.map(item => {
    if (!section[item.sectionId])//if section id is not found in section group, insert it
    {
      section[item.sectionId] = item.sectionId;
      results.push(
        {
          id: item.id,
          title: item.webTitle,
          link: item.webUrl,
          date: moment(item.webPublicationDate).format('DD/MM/YYYY'),
          section: item.sectionId
        }
      );
    }
    else //if section id already existing, find the position of new item by comparing section id
    {
      for (let i = 0; i < results.length; i++) {
        if (results[i].section === item.sectionId) {
          results.splice(
            i + 1,
            0,
            {
              id: item.id,
              title: item.webTitle,
              link: item.webUrl,
              date: moment(item.webPublicationDate).format('DD/MM/YYYY'),
              section: item.sectionId
            }
          );
          break;
        }
      }
    }
  });
  return results;
}