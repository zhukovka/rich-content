export class PollApiClient {
  constructor(siteToken) {
    this.siteToken = siteToken;
  }

  async fetchPoll(pollId) {
    const response = await fetch(`/_serverless/social-polls/poll/${pollId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.siteToken,
      },
    });

    return response.json();
  }

  async createPoll(poll) {
    const response = await fetch('/_serverless/social-polls/poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.siteToken,
      },
      body: JSON.stringify(poll),
    });

    return response.json();
  }

  async vote(pollId, optionId) {
    const response = await fetch(`/_serverless/social-polls/poll/${pollId}/option/${optionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.siteToken,
      },
    });

    return response.json();
  }

  async unvote(pollId, optionId) {
    const response = await fetch(`/_serverless/social-polls/poll/${pollId}/option/${optionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.siteToken,
      },
    });

    return response.json();
  }
}
