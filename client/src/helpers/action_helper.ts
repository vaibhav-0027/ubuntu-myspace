import {reduce, concat, pick} from 'lodash';
const LOADING_STATUS = {
    INIT: 0,
    LOADING: 1,
    LOADED: 2,
    ERROR: 3
}

export const generateConstants = function(
  str: string,
  extra_methods: any|null
) {
  const actions = concat(['request', 'response', 'error'], extra_methods);

  return reduce(actions,
    (acc: { [x: string]: string; }, action: string) => {
      if(action) {
        acc[action] = `${str.toUpperCase()}_${action.toUpperCase()}`;
      }
      return Object.assign({}, acc);
    },
    {}
  );
};

export class ReduxAsyncAction {
  constants;
  progressBar;
  request!: (...args: any[]) => (dispatch: any) => any;
  dispatch: any;

  constructor(action_namespace: any, extra_actions?: any) {
    this.constants = generateConstants(action_namespace, extra_actions);
    this.progressBar = false;
  }
  showProgressBar() {
    this.progressBar = true;
  }
  registerRequest(promiseClosure: any) {
    this.request = (...args: any) => {
      return (dispatch: (arg0: { type: any; data?: any; error?: any; }) => void) => {
        dispatch({ type: this.constants.request });
        if (this.progressBar) {
          dispatch({ type: 'PROGRESS_BAR_ACTIVE' });
        }
        this.dispatch = dispatch;

        return promiseClosure
          .apply(this, args)
          .then((data: any) => {
            dispatch({ type: this.constants.response, data });
            if (this.progressBar) {
              dispatch({ type: 'PROGRESS_BAR_COMPLETE' });
            }
            return data;
          })
          .catch((error: any) => {
            dispatch({
              type: this.constants.error,
              error: pick(error, ['data', 'status', 'statusText']) || error
            });
            if (this.progressBar) {
              dispatch({ type: 'PROGRESS_BAR_ERROR' });
            }
            throw error;
          });
      };
    };
  }
}

export const reducerWrapper = function(
  init_state: any,
  handler: (arg0: any, arg1: any) => any,
  options: { request: string | any[]; error: string | any[]; }
) {
  return function(state: any, action: { type: any; error: any; }) {
    if (!state) {
      state = init_state;
    }

    if (options) {
      if (options.request && options.request.length) {
        for (const action_group of options.request) {
          if (action_group.request === action.type) {
            return Object.assign({}, state, {
              loadingStatus: LOADING_STATUS.LOADING,
              loading: true,
              error: null
            });
          }
        }
      }
      if (options.error && options.error.length) {
        for (const action_group of options.error) {
          if (action_group.error === action.type) {
            return Object.assign({}, state, {
              loadingStatus: LOADING_STATUS.ERROR,
              loading: false,
              error: action.error
            });
          }
        }
      }
    }
    return handler(state, action);
  };
};