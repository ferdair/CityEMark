export default function ({ $auth, redirect, store }) {
  const user = $auth.user

  if (user.idComercio !== 0) {
    redirect('/usuarioComercio')
  } else {
  }
}
