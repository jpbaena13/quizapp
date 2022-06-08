import requests from './requests';

const API = document.location.origin;

/**
 * API Calls
 */
export default {
  user: {
    /**
     * Creates a new  <User> according to the given object
     *
     * @param  {object} user <User> object
     *
     * @return {object}      A new <User> object
     */
    create: async (user) => {
      const response = await requests.post(
        `${API}/user`,
        user
      );

      return response;
    },

    /**
     * Returns the authenticated <User>
     *
     * @return {object}       JSON object <User>
     */
    read: async (id) => {
      const response = await requests.get(
        `${API}User/${id}`
      );

      return response;
    },

    /**
     * Update de given user
     *
     * @param  {object} user User data to update
     *
     * @return {object}       JSON object <User>
     */
    update: async (user) => {
      const response = await requests.put(
        `${API}/user/${user.id}`,
        user
      );

      return response;
    },

    /**
     * Delete the given user
     *
     * @param  {object} user User object to delete
     *
     * @return {object}       JSON object <Group>
     */
    delete: async (user) => {
      const response = await requests.delete(
        `${API}/user/${user.id}`,
        user
      );

      return response;
    },

    /**
     * Return all <Challenge>
     *
     * @return {object} JSON object with all <Challenge>
     */
    all: async () => {
      const response = await requests.get(`${API}/user`);
      return response;
    },

    /**
     * Login the given user
     * @type {[type]}
     */
    login: async (credentials) => {
      const response = await requests.post(
        `${API}/login`,
        credentials
      );

      return response;
    }
  },
  quiz: {
    /**
     * Creates a new <Quiz> according to the given object
     *
     * @param  {object} quiz <Quiz> object
     *
     * @return {object}      A new <Quiz> object
     */
    create: async (quiz, headers) => {
      const response = await requests.post(
        `${API}/quiz`,
        quiz,
        headers
      );

      return response;
    },

    /**
     * Returns the authenticated <Quiz>
     *
     * @return {object}       JSON object <Quiz>
     */
    read: async (quiz, headers) => {
      const response = await requests.get(
        `${API}Quiz/${quiz._id}`, // eslint-disable-line
        headers
      );

      return response;
    },

    /**
     * Update de given quiz
     *
     * @param  {object} quiz User data to update
     *
     * @return {object}       JSON object <Quiz>
     */
    update: async (quiz, headers) => {
      const response = await requests.put(
        `${API}/quiz/${quiz._id}`, // eslint-disable-line
        quiz,
        headers
      );

      return response;
    },

    /**
     * Delete the given quiz
     *
     * @param  {object} quiz User object to delete
     *
     * @return {object}       JSON object <Group>
     */
    delete: async (quiz, headers) => {
      const response = await requests.delete(
        `${API}/quiz/${quiz._id}`, // eslint-disable-line
        quiz,
        headers
      );

      return response;
    },

    /**
     * Return all <Quiz>
     *
     * @return {object} JSON object with all <Quiz>
     */
    all: async (headers) => {
      const response = await requests.get(`${API}/quiz`, headers);
      return response;
    },

    /**
     * Add the given question to the quiz
     *
     * @return {Quiz} JSON object
     */
    addQuestion: async (quiz, question, headers) => {
      const response = await requests.post(
        `${API}/quiz/${quiz._id}/question`, // eslint-disable-line
        question,
        headers
      );

      return response;
    }
  }
};
