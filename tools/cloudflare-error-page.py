import webbrowser
from cloudflare_error_page import render as render_cf_error_page

# This function renders an error page based on the input parameters
error_page = render_cf_error_page(
    {
        "title": 'The Myth Of "Consensual" Internet',
        "error_code": "lkyu",
        "more_information": {
            "hidden": "false",
            "text": "电脑互助群",
            "link": "https://qm.qq.com/q/HU05k45VmK",
            "for": "more anxiety and sexual repression",
        },
        "browser_status": {
            "status": "ok",
            "location": "You",
            "name": "Browser",
            "status_text": "I Consent",
        },
        "cloudflare_status": {
            "status": "error",
            "location": "F***ing Everywhere",
            "name": "Croudflies",
            "status_text": "I Don't!",
        },
        "host_status": {
            "status": "ok",
            "location": "Remote",
            "name": "Host",
            "status_text": "Lkyu Consent",
        },
        "error_source": "cloudflare",
        "what_happened": "Isn't There Someone You Forgot To Ask?</br>Obviously NOT LKYU.",
        "what_can_i_do": "Join Harbin Institute of Technology and be rooted in Northeast China.",
        "perf_sec_by": {"text": "Nobody", "link": "about://blank"},
        "time": "2025-12-09 17:03:25 UTC",
        "ray_id": "0123456789abcdef",
        "client_ip": "127.0.0.1",
        "html_title": 'The Myth Of "Consensual" Internet',
    }
)

with open("error.html", "w") as f:
    f.write(error_page)

webbrowser.open("error.html")
