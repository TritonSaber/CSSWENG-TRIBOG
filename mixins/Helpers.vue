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
     
      // const parts = value.toFixed(2).toString().split('.');
      // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      // return parts.join('.');
    },

    isNew(createdAt) {
      return (
        moment(new Date()).diff(moment(createdAt), 'minutes') <= 1
      )
    },
  },

  filters: {
    formatDate(date, format = 'MM/DD/YYYY') {
      return moment(date).format(format)
    }
  }
}
</script>