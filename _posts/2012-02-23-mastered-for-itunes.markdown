---
layout: post
category: blog
title: Mastered for iTunes
---

When I saw this headline on HN I thought to myself "Wow, Apple is finally implementing ReplayGain in iTunes and on iDevices?". Sadly this is not the case. It could do more for the quality of music on iTunes than any increases in bit depth or sample rate.

A quick word on bit depth: 16 bit audio gives us a potential signal to noise ratio of 96dB, which is plenty. The reason why we record in 24 bits is for increased headroom. If I make a 24 bit recording (potential S/N ratio of 144dB, but 124dB with current converters), but my loudest peak is at -18dB, I still have a S/N ratio of 106dB. I can then bring it into a DAW, give it 18dB of digital gain, and my S/N ratio of the 16 bit output file will still be 96dB.

Having a higher fidelity acquisition format than delivery format is not unique to audio. This is why photographers may shoot in RAW, but output to jpeg or tiff and why HD video is edited in 145Mbit/s, but delivered on blu-ray in 40 Mbit/s. It allows for some tweaking in post-production that doesn't come at the expense of not maximizing the potential of the delivery format.

As for bit rates, I think most of the negative perceptions about digital audio come from back when iTunes's default encoding was 128 kbps and ADC technology was still maturing as well as a knee-jerk reaction to lossy compression in general. When I make classical recordings available for web release I use LAME at the V2 setting. Obviously, what bit rate is "good enough" is dependent on program material, but for me that's a reasonably small file size where I don't hear compression artifacts. I know they take some crap for it, but I think Apple choosing 256kbps VBR AAC to be their iTunes plus setting was a good choice.

I don't attempt to fully understand the business implications of these decisions, but "mastered for iTunes" appears to be more gimmick than substance. It may be that Apple is holding on to the high resolution master files for future ALAC release. The engineers quoted in the article talking about having to compensate for AAC's losses are almost certainly talking about 128kbps. A great-sounding recording mastered at 16bit/44.1khz, will still sound great when properly encoded.

Also, Apples "Mastered for iTunes" technology brief seems to be written with hobbyist engineers in mind. I can't imagine any competent mastering engineer finding it useful. Just further evidence that audio mastering as a craft is on its way out.