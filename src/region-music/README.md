# Flare Play Music On Region Touch

![Regions](http://i.imgur.com/CiHrOPl.png)

*Set up your regions.*

-------------------------

![Event](http://i.imgur.com/MthDPDx.png)
*Turn on music with an array of regions. fadeout on others.*

The above shows you how to quickly set up a set of regions that when touched music plays.

In the above, 19 plays the river BGS while 20 fades it out over 2 seconds.

So How is this done?

- Paint some regions on the map, one set is for the music to fade in, the other is for the music to fade out. You  can have multiple regions that fade in music and multiple that fade out music.

- Create a parallel event that contains the script calls you see in the image, for example:

  ```js
  FlarePlayMusicOnRegionTouch.playMusic([19], 'BGS', 'River', 50, 100, 0)
  FlarePlayMusicOnRegionTouch.fadeOutOnRegions([20], 'BGS', 2)
  ```

- Run the game.

When the user touches region 19, BGS of River will play. How ever when the player touches region 20, all BGS's will be faded out over 2 seconds.

> ## ATTN!
>
> I do not fade out BGS or any other music on map
> transfer, thats for you to set up.
