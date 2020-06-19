import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import '@/plugins';
import App from '@/App.vue';

const DUMMY_RETURN_VALUE = 2;

let apiCallShouldFail = false;

window.fetch = jest.fn(async () => {
  if (apiCallShouldFail) {
    throw new Error('fail mock');
  }

  return {
    json: jest.fn(async () => ({
      result: DUMMY_RETURN_VALUE,
    })),
  };
});

window.alert = jest.fn();

const factory = (options) => mount(App, {
  ...options,
});

beforeEach(() => {
  apiCallShouldFail = false;
  jest.clearAllMocks();
});

describe('App.vue', () => {
  it('should make conversion on created', async () => {
    const wrapper = factory();
    await flushPromises();
    expect(wrapper.vm.result).toBe(DUMMY_RETURN_VALUE);
  });

  it('should display alert if api call fails', async () => {
    apiCallShouldFail = true;
    factory();
    await flushPromises();
    expect(window.alert).toHaveBeenCalled();
  });

  it('should make conversion on change from select', async () => {
    const wrapper = factory();
    await flushPromises();
    const amountInput = wrapper.find('#currency-amount');
    amountInput.setValue('20000');
    const fromSelect = wrapper.find('#currency-from');
    fromSelect.setValue('EUR');
    await flushPromises();
    expect(wrapper.vm.result).toBe(DUMMY_RETURN_VALUE);
  });

  it('should not make api call when converting between same currency', async () => {
    const wrapper = factory({
      data: () => ({
        from: 'USD',
        to: 'USD',
      }),
    });

    await flushPromises();

    expect(wrapper.vm.amount).toBe(wrapper.vm.result);
    expect(window.fetch).not.toHaveBeenCalled();
  });

  it('should only have a maximum of 10 history entries', async () => {
    const wrapper = factory();
    await flushPromises();

    wrapper.setData({
      from: 'USD',
      to: 'USD',
    });

    for (let i = 0; i < 11; i += 1) {
      // avoid Vue key warning
      window.Date.now = () => i;

      wrapper.vm.convert();
    }

    expect(wrapper.vm.history).toHaveLength(10);
  });
});
