from app.models import db, Place, environment, SCHEMA
from sqlalchemy.sql import text


def seed_places():
    six_flags = Place(
        name='Six Flags',
        address='1 Six Flags Blvd',
        city='Jackson Township',
        state='NJ',
        zipcode='08527',
        product= 'one day ticket',
        price= 30,
        img1="https://allears.net/wp-content/uploads/2019/04/Six-Flags-Promo.jpeg",
        img2='https://sf-static.sixflags.com/wp-content/uploads/Medusa-Cover-Art-1440X1533-e1659383543412.jpg',
        img3='https://sf-static.sixflags.com/wp-content/uploads/2020/04/2017_sfne_superman_detail_1440x1533.png',
        img4='https://www.app.com/gcdn/presto/2019/11/07/PAPP/33d9c448-f97e-4fd1-afc3-9a77f9ddf737-080411_sixflags_186.jpg?width=660&height=440&fit=crop&format=pjpg&auto=webp',
        img5='https://sf-static.sixflags.com/wp-content/uploads/2023-SFGAm-PMG-web-1536x807.jpg',
        activity_type='amusement park'
    )
    dorne_park = Place(
        name='Dorney Park',
        address='4000 Donrney Park Rd',
        city='Allentown',
        state='PA',
        zipcode='18104',
        product= 'one day ticket',
        price= 40,
        img1='http://hrstoday.com/wp-content/uploads/2022/04/dornp2.jpg',
        img2='https://www.lehighvalleylive.com/resizer/2W-2gX2pveG-yZsbkdQ3CR99ZSE=/800x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.lehighvalleylive.com/home/lvlive-media/width2048/img/lehigh-county/photo/20781440-standard.jpg',
        img3='https://images.coasterpedia.net/thumb/0/0d/Meteor_%28Dorney_Park%29_2012_01.jpg/800px-Meteor_%28Dorney_Park%29_2012_01.jpg',
        img4='https://www.paamusementparks.com/wp-content/uploads/2019/01/9-1-1920x1020.jpg',
        img5='https://www.themeparkbrochures.net/wp-content/uploads/2016/03/Dorney-Park-Map-2002-600x384.jpg',
        activity_type='water park'
    )
    bronx_zoo = Place(
        name='Bronx Zoo',
        address='2300 Southern Blvd',
        city='Bronx',
        state='NY',
        zipcode='10460',
        product= 'one day ticket',
        price= 50,
        img1='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Bronx_Zoo_001.jpg/1280px-Bronx_Zoo_001.jpg',
        img2='https://res.klook.com/image/upload/u_activities:urzpqnblzku48zeapupz,h_1.0,ar_960:460,c_scale,e_blur:10000/c_fill,w_843,h_474/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/urzpqnblzku48zeapupz.webp',
        img3='https://static01.nyt.com/images/2015/06/28/nyregion/28ELEPHANT/28ELEPHANT-superJumbo.jpg?quality=75&auto=webp',
        img4='https://www.nydailynews.com/resizer/Lg2A4j0v0Dxjauxydd0TjtTMrUI=/1024x0/filters:format(jpg):quality(70)/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/5G7D3OWIVJ2DP2EO6XYBL722UM.jpg',
        img5='https://cdn.wcs.org/2023/05/18/15/46/54/dace9286-07f5-4e2b-ab49-65345f8cee3c/bz-map-spring-2023-with-budgie.png',
        activity_type='zoo'
    )
    place1 = Place(
        name='Natural History Museum',
        address='200 Central Park West',
        city='New York City',
        state='NY',
        zipcode='10024',
        product= 'one day ticket',
        price= 60,
        img1='https://cdn.tripster.com/travelguide/wp-content/uploads/2022/12/nyc-new-york-natural-history-museum-exterior.jpg?width=950&auto=web',
        img2='https://www.centralpark.com/downloads/10184/download/Museum-of-Natural-History-dinosaur.jpg?cb=eb286dc9eabefb2c8f11329c09a547e9&w=1100&h=',
        img3='https://media.cntraveler.com/photos/5a7746e0aeb19b5730310bf7/16:9/w_1920,c_limit/Museum-of-Natural-History_AMNHD.-Finnin_2018_4.-Afr.jpg',
        img4='https://images.squarespace-cdn.com/content/v1/5845d1c3e4fcb5c4ed9162ef/1625635310617-F3QLEM9ALXP8DKQAM7HR/8033432844_9636aa7890_b.jpg?format=1500w',
        img5='https://i1.wp.com/guidemapsonline.com/wp-content/uploads/2019/04/English_Museum_Map_2018_4.jpg?fit=700%2C906&ssl=1',
        activity_type='museum'
    )
    place2 = Place(
        name='Splish Splash',
        address='2549 Splish Splash Dr',
        city='Calverton',
        state='NY',
        zipcode='11933',
        img1='https://i.ytimg.com/vi/pWXY62m1STs/maxresdefault.jpg',
        img2= 'https://www.splishsplash.com/content/dam/sny/images/attractions/alien-invasion/Alien-Invasion-Attractions-Splish-Splash-main.jpg',
        img3= 'https://www.splishsplash.com/content/dam/sny/images/attractions/barrier-reef/Barrier-Reef-Attractions-Splish-Splash-main.jpg',
        img4= 'https://www.splishsplash.com/content/dam/sny/images/attractions/bootleggers-run/Bootleggers-Run-Attractions-Splish-Splash-main.jpg',
        img5= 'https://havesippywilltravel.com/wp-content/uploads/2016/06/pic-10.jpg',
        product= 'one day ticket',
        price= 60,
        activity_type='water park'
    )
    place3 = Place(
        name='New York Aquarium',
        address='602 Surf Ave',
        city='Brooklyn',
        state='NY',
        zipcode= '11224',
        img1= 'https://www.nyc-arts.org/wp-content/uploads/2011/04/702013476_c35806b1a2_b.jpg',
        img2= 'https://cdn.wcs.org/2022/05/24/7lv2e7jvgk_Julie_Larsen_Maher_2771_2_Hudson_Canyon_with_Visitors_and_Sharks_OWS_AQ_11_19_18.jpg',
        img3= 'https://www.brooklynpaper.com/wp-content/uploads/2020/08/Select-20200824_29_0P9A3109_Erica-Price-scaled.jpg',
        img4= 'https://media.timeout.com/images/102718559/image.jpg',
        img5= 'https://zooinstitutes.com/img/MAPS/1526157800_map.png.pagespeed.ce.50RUHAwBV5.png',
        product= 'one day ticket',
        price= 50,
        activity_type='aqurium'
    )

    db.session.add(six_flags)
    db.session.add(dorne_park)
    db.session.add(bronx_zoo)
    db.session.add(place1)
    db.session.add(place2)
    db.session.add(place3)
    db.session.commit()


def undo_places():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.places RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM places"))

    db.session.commit()
