# Manypenny's Auto Body website preview

A static, responsive website concept for Manypenny's Auto Body in Wilmington, NC.

## Preview locally

From this folder run `python3 -m http.server 4174` and open `http://localhost:4174`.

## Pages

- `index.html` — shop overview, services, public customer-review excerpts, profile gallery photos, address, phone, and an estimate-request SMS draft form.
- `services/collision-repair.html`
- `services/bumper-panel-repair.html`
- `services/paint-refinishing.html`
- `services/insurance-help.html`

## Public information and assets

Business name, address, phone and weekday schedule were cross-checked against the [Loc8NearMe listing](https://www.loc8nearme.com/north-carolina/wilmington/manypennys-auto-body/8768719/) and [AutoRepairScore profile](https://autorepairscore.com/nc/wilmington/manypennys-auto-body-wilmington-north-carolina). Those sources disagree about the listed closing time, so the site says to call ahead instead of publishing a time. Service descriptions are limited to collision/body repair, bumpers/panels, paint/refinishing, and insurance questions reflected in public directories and customer comments; confirm the actual service menu with the shop.

The nine locally stored JPEGs are from the Loc8NearMe gallery, whose images are explicitly credited to Google. They appear to be Google Business Profile photos, but ownership and permission to reuse them on a public website still need confirmation from the shop. Do not treat the gallery as a verified before/after portfolio.

The rotating review band uses short, manually selected excerpts shown on the public Loc8NearMe listing, dated between August 2024 and June 2026. The page links to a Google Maps search for the business, but the review carousel is not a live Google feed, and the excerpts should be verified against the Google profile before launch.

## Contact form

The form validates in the browser and opens a prefilled SMS draft to the publicly listed shop number. It does not send data from the website. Confirm that the number accepts text messages; if not, replace the form action with an owner-approved contact route. The site currently uses `robots` noindex metadata and `robots.txt` disallows crawling because it is a preview.
