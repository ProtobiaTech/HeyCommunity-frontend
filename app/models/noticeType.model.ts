export class NoticeType {
  constructor(
    public id: number
  ) {  }
}



export const NoticeTypes = {
  10: {
    name: 'timeline_like',
    eventText: 'Like Your Timeline',
  },

  11: {
    name: 'timeline_comment',
    eventText: 'Comment Your Timeline',
  },

  12: {
    name: 'timeline_comment_comment',
    eventText: 'comment Your Timeline Comment',
  },
};
