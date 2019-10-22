import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
// import services from '@/services';
interface DemoState {
  dataInfo: any;
}
// 定义model对象的type
interface DemoModelType {
  namespace: 'Demo';
  state: DemoState;
  subscriptions: { setup: Subscription };
  effects: {
    getData: Effect;
  };
  reducers: {
    save: Reducer<DemoState>;
  };
}
const Demo: DemoModelType = {
  namespace: 'Demo',
  state: {
    dataInfo: null
  },
  subscriptions: {
    setup({ history, dispatch }): void {
      history.listen(({ pathname, state }): void => { });
    },
  },
  effects: {
    * getData({ payload }, { call, put }) {
      //   const data = yield call(services.getInfo, payload);
      //   yield put({
      //     type: 'save',
      //     payload: { dataInfo: data.data },
      //   });
    },
  },

  reducers: {
    save(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
export default Demo;
