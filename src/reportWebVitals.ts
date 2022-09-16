import { ReportHandler } from 'web-vitals'

const reportWebVitals = async (onPerfEntry?: ReportHandler): Promise<void> => {
  if ((onPerfEntry != null) && onPerfEntry instanceof Function) {
    await import('web-vitals')
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry)
        getFID(onPerfEntry)
        getFCP(onPerfEntry)
        getLCP(onPerfEntry)
        getTTFB(onPerfEntry)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export default reportWebVitals
