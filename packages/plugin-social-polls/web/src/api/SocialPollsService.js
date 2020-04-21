import axios from 'axios';

export class SocialPollsService {
  static CANCEL_MESSAGE = 'cancel';

  client;

  cancelTokens = {
    createPoll: null,
    updatePoll: null,
  };

  constructor(siteToken) {
    this.client = axios.create({
      baseURL: '/_serverless/polls-client/v1',
      headers: {
        Authorization: siteToken,
      },
    });

    this.client.interceptors.response.use(this.successResponseInterceptor);
  }

  successResponseInterceptor(response) {
    return response.data?.question || response.data;
  }

  failResponseInterceptor(error) {
    return Promise.reject(error);
  }

  fetchPoll(pollId) {
    return this.client.get(`/questions/${pollId}`);
  }

  createPoll(question) {
    const source = axios.CancelToken.source();

    this.cancelTokens.createPoll = source;

    return this.client
      .post(
        '/questions',
        { question },
        {
          cancelToken: source.token,
        }
      )
      .then(response => {
        this.cancelTokens.createPoll = null;
        return response;
      });
  }

  updatePoll(question) {
    const source = axios.CancelToken.source();

    this.cancelTokens.updatePoll = source;

    return this.client
      .patch(
        `/questions/${question.id}`,
        { question },
        {
          cancelToken: source.token,
        }
      )
      .then(response => {
        this.cancelTokens.updatePoll = null;
        return response;
      });
  }

  vote(pollId, optionId) {
    return this.client.post(`/questions/${pollId}/vote`, {
      optionId,
    });
  }

  unvote(pollId, optionId) {
    return this.client.post(`/questions/${pollId}/unvote`, {
      optionId,
    });
  }

  getVoters(pollId, optionId, params) {
    return this.client.get(`/questions/${pollId}/options/${optionId}/voters`, { params });
  }
}
