import axios from 'axios';

export class SocialPollsService {
  static CANCEL_MESSAGE = 'cancel';

  client;

  cancelTokens = {
    createPoll: null,
  };

  constructor(siteToken) {
    this.client = axios.create({
      baseURL: '/_serverless/social-polls',
      headers: {
        Authorization: siteToken,
      },
    });

    this.client.interceptors.response.use(this.successResponseInterceptor);
  }

  successResponseInterceptor(response) {
    return response.data;
  }

  failResponseInterceptor(error) {
    return Promise.reject(error);
  }

  fetchPoll(pollId) {
    return this.client.get(`/poll/${pollId}`);
  }

  createPoll(poll) {
    const source = axios.CancelToken.source();

    this.cancelTokens.createPoll = source;

    return this.client
      .post('/poll', poll, {
        cancelToken: source.token,
      })
      .then(response => {
        this.cancelTokens.createPoll = null;
        return response;
      });
  }

  vote(pollId, optionId) {
    return this.client.post(`/poll/${pollId}/option/${optionId}`);
  }

  unvote(pollId, optionId) {
    return this.client.delete(`/poll/${pollId}/option/${optionId}`);
  }
}
