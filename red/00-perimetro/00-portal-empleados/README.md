# portal-empleados

**Zona:** 00 · Perímetro · **Dificultad:** 🟢 Fácil
**Categorías:** web, inyección SQL, reúso de credenciales, escalada de privilegios
**Hostname:** `portal-empleados.helixcorp.local` · **IP narrativa:** `10.0.0.10`

## Briefing

El Portal de Autogestión de HELIX: donde los empleados miran su ficha y buscan el interno de un compañero. Lo levantaron en 2019 "para ayer" y nunca más lo tocaron. Está de cara a internet, corre sobre la misma caja que usa el sysadmin para todo, y arrastra una costumbre fea: la gente que lo mantiene repite contraseñas como quien repite el café de la mañana.

Es la puerta de entrada a HELIX. Si acá adentro no cuidan ni los datos de su propia gente, imaginate lo que viene después.

> *"Un portal de RRHH no le importa a nadie. Por eso es por donde se entra."*
> — Ceniza

## Objetivo

Conseguir acceso root y leer `/root/flag.txt`.

## Levantar

```bash
docker compose up -d
```

- Portal web: http://localhost:8080
- SSH: `ssh usuario@localhost -p 2222`

Resetear: `docker compose down -v && docker compose up -d`

## Fragmento del expediente

Con la flag, desde la raíz del repo:

```bash
./herramientas/abrir-fragmento.sh red/00-perimetro/00-portal-empleados 'HELIX{...}'
```

## Pistas

<details>
<summary>Pista 1</summary>

El buscador del directorio no filtra lo que escribís: lo que tipeás termina dentro de la consulta a la base. ¿Qué pasa si lo que escribís *también* es consulta?

</details>

<details>
<summary>Pista 2</summary>

La tabla de empleados tiene más columnas de las que el directorio muestra. Si la búsqueda devuelve cuatro columnas, podés pedir cuatro columnas tuyas. Entre lo que se guarda está el usuario y el hash de su contraseña (MD5 pelado, de los que una wordlist como `rockyou` rompe en segundos).

</details>

<details>
<summary>Pista 3</summary>

El sysadmin reusa la misma contraseña para el portal y para su cuenta del sistema: entrá por SSH con ella (puerto 2222). Una vez adentro, mirá qué podés correr con `sudo` sin que te pida clave — y pasá por [GTFOBins](https://gtfobins.github.io/) a ver cómo ese binario te devuelve una shell de root.

</details>
