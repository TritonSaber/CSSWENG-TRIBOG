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
      return parseFloat(value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    },

    isNew(createdAt) {
      return (
        moment(new Date()).diff(moment(createdAt), 'minutes') <= 1
      )
    },
    
    infiniteScrollScrollPagination(elementRef, bottomLimit, callback) {
      elementRef.onscroll = () => {
        const scrollY = elementRef.scrollHeight - elementRef.scrollTop
        const height = elementRef.offsetHeight
        const offset = height - scrollY
        if (offset >= bottomLimit) {
          callback()
        }
      }
    },
  },

  filters: {
    formatDate(date, format = 'MM/DD/YYYY') {
      return moment(date).format(format)
    }
  }
}
</script>