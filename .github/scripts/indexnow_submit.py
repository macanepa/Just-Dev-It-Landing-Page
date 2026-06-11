# Envía todas las URLs del sitemap.xml a IndexNow (Bing, Yandex, Seznam, Naver).
# Se ejecuta desde GitHub Actions en cada push a main que toque HTML o el sitemap.
# Solo usa la librería estándar: no requiere pip install.
import json
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET

HOST = "justdev.it"
KEY = "51986cd8391652d7b04c0d46b58d6d8b"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"
NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def fetch(url, data=None, headers=None, timeout=30):
    req = urllib.request.Request(url, data=data, headers=headers or {})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.status, resp.read().decode("utf-8", "replace")


def main():
    urls = [
        loc.text.strip()
        for loc in ET.parse("sitemap.xml").getroot().findall("sm:url/sm:loc", NS)
        if loc.text
    ]
    if not urls:
        print("sitemap.xml sin URLs; nada que enviar")
        return 0
    print(f"{len(urls)} URLs en sitemap.xml")

    # Esperar a que GitHub Pages publique el archivo de la llave (el deploy de
    # Pages corre en paralelo a este workflow; ~1-2 min tras el push).
    for attempt in range(12):
        try:
            status, body = fetch(KEY_LOCATION)
            if status == 200 and KEY in body:
                print(f"llave verificada en {KEY_LOCATION}")
                break
        except Exception as e:
            print(f"intento {attempt + 1}: llave aún no disponible ({e})")
        time.sleep(30)
    else:
        print(f"ERROR: {KEY_LOCATION} no quedó disponible; abortando", file=sys.stderr)
        return 1

    payload = json.dumps({
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }).encode("utf-8")

    for attempt in range(3):
        try:
            status, body = fetch(
                ENDPOINT, data=payload,
                headers={"Content-Type": "application/json; charset=utf-8"},
            )
            if status in (200, 202):
                print(f"IndexNow aceptó el envío (HTTP {status})")
                return 0
            print(f"respuesta inesperada HTTP {status}: {body[:300]}", file=sys.stderr)
        except urllib.error.HTTPError as e:
            print(f"intento {attempt + 1}: HTTP {e.code} {e.read()[:300]}", file=sys.stderr)
            if e.code in (400, 403, 422):  # error permanente, reintentar no ayuda
                return 1
        except Exception as e:
            print(f"intento {attempt + 1}: {e}", file=sys.stderr)
        time.sleep(60)
    return 1


if __name__ == "__main__":
    sys.exit(main())
