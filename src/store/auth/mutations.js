export function setUser (state, data) {
  if (data) {
    state.user = {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role
    }
  } else {
    state.user = null
  }
}
