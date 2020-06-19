import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import '@/plugins';
import App from '@/App.vue';

const factory = (options) => mount(App, {
  ...options,
});

describe('App.vue', () => {
  it('should make conversion on created', async () => {
    const wrapper = factory();
    await flushPromises();
    expect(wrapper.vm.result).toBe(wrapper.vm.amount * 2);
  });

  it('should make conversion on change from select', async () => {
    const wrapper = factory();
    await flushPromises();
    const amountInput = wrapper.find('#currency-amount');
    amountInput.setValue('20000');
    const fromSelect = wrapper.find('#currency-from');
    fromSelect.setValue('EUR');
    await flushPromises();
    expect(wrapper.vm.result).toBe(400);
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
