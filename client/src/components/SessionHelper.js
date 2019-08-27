export function getSessionSparks() {
  let session_sparks = sessionStorage.getItem('session_sparks');
  if (!session_sparks) return [];
  else return JSON.parse(session_sparks);
}

export function addSessionSpark(session_spark) {
  session_sparks = this.getSessionSparks();
  session_sparks.push(session_spark);
  sessionStorage.setItem('session_sparks', JSON.stringify(session_sparks));
}
