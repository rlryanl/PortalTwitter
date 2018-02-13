module.exports = {
    cookieName: 'session',
    secret: 'asdflasdfs',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly:true,
    secure: true,
    ephemeral: true
}