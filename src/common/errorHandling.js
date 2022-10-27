const i18n = require('i18n')

const libraryAnalysisError = () => {
  console.log(i18n.__('libraryAnalysisError'))
}

const snapshotFailureError = () => {
  console.log(i18n.__('snapshotFailureMessage'))
}

const vulnerabilitiesFailureError = () => {
  console.log(i18n.__('vulnerabilitiesFailureMessage'))
}

const reportFailureError = () => {
  console.log(i18n.__('auditReportFailureMessage'))
}

const genericError = () => {
  console.error(i18n.__('genericErrorMessage'))
  process.exit(1)
}

const unauthenticatedError = () => {
  generalError('unauthenticatedErrorHeader', 'unauthenticatedErrorMessage')
}

const badRequestError = catalogue => {
  catalogue === true
    ? generalError('badRequestErrorHeader', 'badRequestCatalogueErrorMessage')
    : generalError('badRequestErrorHeader', 'badRequestErrorMessage')
}

const forbiddenError = () => {
  generalError('forbiddenRequestErrorHeader', 'forbiddenRequestErrorMessage')
  process.exit(1)
}

const proxyError = () => {
  generalError('proxyErrorHeader', 'proxyErrorMessage')
}

const maxAppError = () => {
  generalError(
    'No applications remaining',
    'You have reached the maximum number of application you can create.'
  )
  process.exit(1)
}

const failOptionError = () => {
  console.log(
    '\n ******************************** ' +
      i18n.__('snapshotFailureHeader') +
      ' ********************************\n' +
      i18n.__('failOptionErrorMessage')
  )
}

/**
 * You don't have to pass `i18n` translation.
 * String that didn't exists on translations will pass as regular string
 * @param header title for the error
 * @param message message for the error
 * @returns error in general format
 */
const getErrorMessage = (header, message) => {
  // prettier-ignore
  const title = `******************************** ${i18n.__(header)} ********************************`
  const multiLine = message?.includes('\n')
  let finalMessage = ''

  // i18n split the line if it includes '\n'
  if (multiLine) {
    finalMessage = `\n${message}`
  } else if (message) {
    finalMessage = `\n${i18n.__(message)}`
  }

  return `${title}${finalMessage}`
}

const generalError = (header, message) => {
  const finalMessage = getErrorMessage(header, message)
  console.log(finalMessage)
}

const findCommandOnError = unknownOptions => {
  const commandKeywords = {
    auth: 'auth',
    audit: 'audit',
    scan: 'scan',
    lambda: 'lambda',
    config: 'config'
  }

  const containsCommandKeyword = unknownOptions.some(
    command => commandKeywords[command]
  )

  if (containsCommandKeyword) {
    const foundCommands = unknownOptions.filter(
      command => commandKeywords[command]
    )

    //return the first command found
    return foundCommands[0]
  }
}

module.exports = {
  genericError,
  unauthenticatedError,
  badRequestError,
  forbiddenError,
  proxyError,
  failOptionError,
  generalError,
  getErrorMessage,
  libraryAnalysisError,
  findCommandOnError,
  snapshotFailureError,
  vulnerabilitiesFailureError,
  reportFailureError,
  maxAppError
}