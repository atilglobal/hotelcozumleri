$base = "https://images.unsplash.com"
$out = Join-Path $PSScriptRoot "..\public\images\services"
$q = "?w=1200&q=85&auto=format&fit=crop"

$downloads = @{
  "web\feature-mobile.jpg" = "$base/photo-1512941937669-90a1b58e7e9c$q&w=800"
  "web\feature-multilingual.jpg" = "$base/photo-1566073771259-6a8506099945$q&w=900"
  "web\feature-seo.jpg" = "$base/photo-1432888498266-38ffec3eaf4a$q&w=900"
  "web\feature-hotelio.jpg" = "$base/photo-1551288049-bebda4e38f71$q&w=900"
  "web\feature-booking.jpg" = "$base/photo-1566073771259-6a8506099945$q&w=900&crop=entropy"
  "web\feature-payment.jpg" = "$base/photo-1563013544-824ae1b704d3$q&w=900"

  "social\post-suite.jpg" = "$base/photo-1631049307264-da0ec9d70304$q&w=800"
  "social\story-spa.jpg" = "$base/photo-1540555700478-4be289fbbe30$q&w=800"
  "social\reels-pool.jpg" = "$base/photo-1571896349842-33c89424de2d$q&w=800"
  "social\cal-room.jpg" = "$base/photo-1631049307264-da0ec9d70304$q&w=600"
  "social\cal-reels.jpg" = "$base/photo-1571896349842-33c89424de2d$q&w=600"
  "social\cal-gastro.jpg" = "$base/photo-1414235077428-338989a2e8c0$q&w=600"
  "social\cal-lobby.jpg" = "$base/photo-1566073771259-6a8506099945$q&w=600"

  "doors\hero-door-lock.jpg" = "$base/photo-1558002008-1055907a8272$q&w=1920"
  "doors\fire-door.jpg" = "$base/photo-1497366811353-6870744d04b2$q&w=900"
  "doors\electronic-lock.jpg" = "$base/photo-1558002008-1055907a8272$q&w=900"
  "doors\mifare-card.jpg" = "$base/photo-1563013544-824ae1b704d3$q&w=900"
  "doors\access-control.jpg" = "$base/photo-1555949963-aa79dcee981c$q&w=900"
  "doors\room-door.jpg" = "$base/photo-1631889993953-f663a2500ee6$q&w=900"
  "doors\integration-desk.jpg" = "$base/photo-1566073771259-6a8506099945$q&w=900&crop=top"
  "doors\flow-guest.jpg" = "$base/photo-1564501049412-61c781a8e591$q&w=600"

  "textile\hero-linens.jpg" = "$base/photo-1583847268964-bdc210f2e6a9$q&w=1920"
  "textile\towel.jpg" = "$base/photo-1583847268964-bdc210f2e6a9$q&w=900"
  "textile\bathrobe.jpg" = "$base/photo-1591047139829-d63791922708$q&w=900"
  "textile\bedding.jpg" = "$base/photo-1615874959475-aaf0a5676f07$q&w=900"
  "textile\slippers.jpg" = "$base/photo-1600880292203-757bb62b4baf$q&w=900"
  "textile\plain-towel.jpg" = "$base/photo-1583847268964-bdc210f2e6a9$q&w=900&sat=-20"
  "textile\embroidery-process.jpg" = "$base/photo-1616486338812-3ada4544d4ab$q&w=900&crop=entropy"
  "textile\branded-towel.jpg" = "$base/photo-1583847268964-bdc210f2e6a9$q&w=900&crop=focalpoint"
  "textile\embroidery-detail.jpg" = "$base/photo-1616486338812-3ada4544d4ab$q&w=1200&crop=entropy"

  "cleaning\hero-housekeeping.jpg" = "$base/photo-1628177142898-93e36e4e3a50$q&w=1920"
  "cleaning\room-amenities.jpg" = "$base/photo-1612810819220-85367b1d17c8$q&w=900"
  "cleaning\pool-chemicals.jpg" = "$base/photo-1576013558760-2a5d7bf85367$q&w=900"
  "cleaning\kitchen-cleaning.jpg" = "$base/photo-1565193566172-7a0ee6d14654$q&w=900"
  "cleaning\laundry-detergent.jpg" = "$base/photo-1582735689360-6524467f4275$q&w=900"
  "cleaning\floor-cleaning.jpg" = "$base/photo-1628177142898-93e36e4e3a50$q&w=900&crop=entropy"

  "spa\hero-wellness.jpg" = "$base/photo-1544161515-4ab6ce6db874$q&w=1920"
  "spa\sauna.jpg" = "$base/photo-1540555700478-4be289fbbe30$q&w=1000"
  "spa\steam-room.jpg" = "$base/photo-1544161515-4ab6ce6db874$q&w=1000&crop=entropy"
  "spa\massage-room.jpg" = "$base/photo-1519824149195-7f5725521c6b$q&w=1000"
  "spa\experience-shower.jpg" = "$base/photo-1548941338411-87b503a4d4c9$q&w=1000"
  "spa\relax-lounge.jpg" = "$base/photo-1600334128400-2dc717fc1f67$q&w=1000"
  "spa\wellness-pool.jpg" = "$base/photo-1571896349842-33c89424de2d$q&w=1000"
}

foreach ($folder in @("web","social","doors","textile","cleaning","spa")) {
  New-Item -ItemType Directory -Force -Path (Join-Path $out $folder) | Out-Null
}

foreach ($entry in $downloads.GetEnumerator()) {
  $dest = Join-Path $out $entry.Key
  Write-Host "Downloading $($entry.Key)..."
  curl.exe -sL -o $dest $entry.Value
}

Write-Host "Done. Downloaded $($downloads.Count) images."
