import { logError } from './utils'

export async function webVitals ({ route, options, sendToAnalytics }) {
  const context = {
    fullPath: route.fullPath,
    href: location.href
  }

  // TODO: get page path
  // if (route.matched.length) {
  //   context.page = route.matched[route.matched.length - 1].components.default.options.__file || page
  // }

  try {
    const { onCLS, onLCP, onTTFB, onFCP, onINP } = await import(
      'web-vitals/attribution'
    ).then((r: any) => r.default || r)

    onTTFB(metric => sendToAnalytics(context, metric, options))
    onLCP(metric => sendToAnalytics(context, metric, options))
    onCLS(metric => sendToAnalytics(context, metric, options))
    onFCP(metric => sendToAnalytics(context, metric, options))
    onINP(metric => sendToAnalytics(context, metric, options))
  } catch (err) {
    logError(err)
  }
}
