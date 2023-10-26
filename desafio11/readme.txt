tenes q sacarle el Mayra al nombre del archio Mayra.env, para tener las nuevas variables de entorno.

respecto a los roles.. antes los roles no estaban en la BD y ahora si.. 
pero a considerar:
    - siempre el que se loguee con adminCoder@coder.com, va a ser "admin", osea que si alguien le modifica el role en la BD, igualmente va a tener privilegios de admin. 
    - el resto de los mails, van a ser "user","premium" o "admin" segun sea el rol de la BD, en estos casos, si se modica el role admin de algun usuario, va a perder sus privilegios.
