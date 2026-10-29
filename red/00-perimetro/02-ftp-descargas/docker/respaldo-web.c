/* respaldo-web — helper de respaldo del servidor de descargas.
 * Comprime el sitio en /var/backups. Lo dejó Sistemas en 2017 para que el
 * usuario del servidor pudiera disparar el respaldo sin pedir la clave de root.
 */
#include <stdlib.h>
#include <unistd.h>

int main(void)
{
    setuid(0);
    setgid(0);
    system("tar czf /var/backups/descargas.tgz /var/www/html 2>/dev/null");
    return 0;
}
