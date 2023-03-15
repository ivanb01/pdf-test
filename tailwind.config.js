module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    backgroundImage: {
      sidebar: "url('../public/images/sidebar.png')",
      'oxford-gradient':
        'linear-gradient(90.01deg, #0E9AE9 0.18%, #0EA5E9 67.03%, #22C9FE 99.99%);',
    },
    background: {},

    extend: {
      colors: {
        gray1: '#F3F4F6',
        gray2: '#E5E7EB',
        gray3: '#9CA3AF',
        gray4: '#6B7280',
        gray5: '#4B5563',
        gray6: '#374151',
        gray7: '#111827',
        gray8: '#1F2937',
        gray9: '#E5E5E5',
        gray10: '#F9FAFB',
        gray11: '#E5E8EF',
        lightBlue1: '#F0F9FF',
        lightBlue2: '#E0F2FE',
        lightBlue3: '#0EA5E9',
        lightBlue4: '#075985',
        lightBlue5: '#0284C7',
        lightBlue6: '#0369A1',
        indigo1: '#EEF2FF',
        indigo2: '#E0E7FF',
        indigo3: '#C7D2FE',
        indigo4: '#A5B4FC',
        green1: '#ECFDF5',
        green2: '#A7F3D0',
        green3: '#6EE7B7',
        green4: '#059669',
        green5: '#10B981',
        green6: '#34D399',
        green7: '#065F46',
        green8: '#D1FAE5',
        red1: '#FEF2F2',
        red2: '#FEE2E2',
        red3: '#DC2626',
        red4: '#F87171',
        red5: '#EF4444',
        blue1: '#60A5FA',
        blue2: '#3B82F6',
        purple1: '#F5F3FF',
        purple2: '#EDE9FE',
        purple3: '#DDD6FE',
        purple4: '#C4B5FD',
        purple5: '#B0C0FF',
        purple6: '#8B5CF6',
        borderColor: '#D1D5DB',
        menuHover: 'rgba(255, 255, 255, 0.1)',
        overlayBackground: '#6B7280BF',
        orange1: '#FB923C',
        orange2: '#FFEDD5',
        yellow1: '#FFFBEB',
        yellow2: '#FBBF24',
        yellow3: '#92400E',
        rose1: '#FFE4E6',
        onelineBackground: '#F4F6FE',
        onelineMainColor: '#163369',
      },
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(gray1|gray2|gray3|gray4|gray5|gray6|gray7|gray8|gray9|gray10|gray11|lightBlue1|lightBlue2|lightBlue3|lightBlue4|lightBlue5|lightBlue6|indigo1|indigo2|indigo3|indigo4|green1|green2|green3|green4|green5|green6|green7|green8|red1|red2|red3|red4|red5|blue1|blue2|purple1|purple2|purple3|purple4|purple5|purple6|borderColor|menuHover|overlayBackground|orange1|orange2|yellow1|yellow2|yellow3|rose)/,
    },
  ],
  variants: {
    extend: {
      display: ['group-hover'],
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
};
