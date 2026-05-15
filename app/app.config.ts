export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'zinc',
    },
    button: {
      slots: {
        base: 'h-[40px]',
      },
    },
    input: {
      slots: {
        base: 'h-[40px]',
      },
    },
  },
  toaster: {
    position: 'top-right' as const,
    duration: 5000,
    max: 5,
    expand: true,
  },
});
