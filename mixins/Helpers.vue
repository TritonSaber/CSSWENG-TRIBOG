<script>
import moment from 'moment'

export default {
  methods: {
    // keyboard events
    preventDecimal(event) {
      if (event.key === '.' || event.key === 'Decimal') {
        event.preventDefault();
      }
    },

    // number formatting
    numberFormat(value) {
      return value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    },
  },

  filters: {
    formatDate(date, format = 'MM/DD/YYYY') {
      return moment(date).format(format)
    }
  }
}
</script>