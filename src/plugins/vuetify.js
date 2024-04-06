import 'vuetify/styles'
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
    components,
    directives,
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    moderateBlue: "hsl(238, 40%, 52%)",
                    softRed: "hsl(358, 79%, 66%)",
                    paleRed: "hsl(357, 100%, 86%)",
                    lightGrayishBlue: "hsl(239, 57%, 85%)",
                    darkBlue: "hsl(212, 24%, 26%)",
                    grayishBlue: "hsl(211, 10%, 45%)",
                    lightGray: "hsl(223, 19%, 93%)",
                    veryLightGray: "hsl(228, 33%, 97%)"
                }
            },
        },
    },
})
