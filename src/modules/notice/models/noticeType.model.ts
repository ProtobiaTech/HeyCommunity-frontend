export class NoticeType {
  constructor(
    public id: number
  ) {  }
}


export const NoticeTypes = {
  10: {
    name: 'timeline_like',
    eventText: 'notice.Like Your Timeline',
  },

  11: {
    name: 'timeline_comment',
    eventText: 'notice.Comment Your Timeline',
  },

  12: {
    name: 'timeline_comment_comment',
    eventText: 'notice.Comment Your Timeline Comment',
  },
};
