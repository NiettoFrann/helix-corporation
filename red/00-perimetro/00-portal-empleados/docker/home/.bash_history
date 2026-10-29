cd /var/www/html
vi config.php
sudo systemctl restart apache2
mysql -u portal_app -p portal
clear
df -h
du -sh /var/log/*
sudo find /var/log -name "*.gz" -mtime +30 -delete
crontab -l
echo "la misma clave de siempre, despues la cambio" >> recordatorios.txt
rm recordatorios.txt
history -c
