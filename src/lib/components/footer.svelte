<script lang="ts">

    import { onMount } from "svelte";
    import { letterSlideIn, maskSlideIn } from "$lib/animations";
    import { loadPagePromise } from "$lib/store";
    import { onScrolledIntoView } from "$lib/utils";
    import { dataState } from "$lib/state.svelte";

    let footerContainerElement: HTMLElement = $state()!
    let logoElement: HTMLElement = $state()!; 
    let creditsElement: HTMLElement = $state()!; 
    let statusElement: HTMLElement = $state()!; 
    let fullEmailLinkElement: HTMLElement = $state()!;

    let signaturePath1: SVGPathElement = $state()!; 
    let signaturePath2: SVGPathElement = $state()!; 
    let signaturePath3: SVGPathElement = $state()!;
    let signaturePath4: SVGPathElement = $state()!; 

    const currentYear = new Date().getFullYear();
    
    function introAnimations() {

        // Scroll activated animations powered by anime instead of svelte transitions
        const logoAnimate = maskSlideIn(logoElement, {});
        const fullEmailLinkAnimate = letterSlideIn(fullEmailLinkElement, { delay: 6, initDelay: 150 });
        const creditsAnimate = maskSlideIn(creditsElement, { delay: 150 });
        const statusAnimate = letterSlideIn(statusElement, { delay: 6, initDelay: 100 });

        // Intersection observer to run animations when footer is in scroll view
        onScrolledIntoView(footerContainerElement, () => {
            logoAnimate.anime();
            creditsAnimate.anime();
            fullEmailLinkAnimate.anime();
            statusAnimate.anime();

            // Signature animation removed
        });
    }

    onMount(async () => {
        await loadPagePromise;
        introAnimations();
    });

</script>



<div class="footer-wrapper" bind:this={footerContainerElement}>
    <!-- Left side -->
    <div class="flex-wrapper">
        <div class="logo-wrapper">
            <div class="inline-flex" bind:this={logoElement}>
                <img src="assets/imgs/logo.png" alt="Tushar Dhingra logo" class="logo">
            </div>
        </div>

        <div class="status-wrapper">
            {#if dataState.siteData}
                {#if dataState.siteData!.availablity_date === ""}
                    <p class="large-text" bind:this={statusElement}>
                        i am currently accepting freelance work, <br>you may reach me on my email.
                    </p>
                {:else}
                    <p class="large-text" bind:this={statusElement}>
                        i am available for freelance work <br> {dataState.siteData.availablity_date}.
                    </p>
                {/if}
            {/if}
            <a class="button large-text" bind:this={fullEmailLinkElement} href="mailto:tushardhingra808@gmail.com" target="_blank">tushardhingra808@gmail.com</a>
        </div>
        
        <div class="credits-wrapper" bind:this={creditsElement}>
            <p class="year">© {currentYear}</p>
            <p class="credits">
                designed and developed by Tushar Dhingra<br>
                
                <!-- Support the project by keeping this line in your fork -->
                <a class="clickable button no-decor" href="https://github.com/Tushar-Dhingra" target="_blank">
                </a>
            </p>
        </div>
    </div>

    <!-- Right side -->
	<div class="flex-wrapper decor">
        <!-- Tushar Dhingra SVG Signature -->
        <!-- Signature Removed -->
    </div>
</div>



<style lang="sass">

@use "../consts.sass" as consts

@include consts.textStyles()

.footer-wrapper
    width: 100vw
    background-color: #131314
    display: flex
    flex-direction: row
    justify-content: space-between
    padding: 15vh 13vw
    margin-top: 25vh
    box-sizing: border-box

    @media only screen and (max-width: 950px)
        .flex-wrapper.decor
            display: none !important

    @media only screen and (max-width: 950px)
        flex-direction: column-reverse

        .flex-wrapper:not(:first-child)
            margin-bottom: 15vh

    .inline-flex
        flex-grow: 1
        display: flex
        flex-direction: row
        align-items: center


    .logo-wrapper
        margin-bottom: 5vh

        .logo
            display: inline-block
            height: 6vh

    .status-wrapper
        .button.large-text
            margin-top: 2vh

    .credits-wrapper
        margin-top: 5vh
        color: rgba(255,255,255,0.3)

        p.year
            margin-bottom: 1vh
            font-family: consts.$font
            font-size: 1.8vh
            font-weight: normal
            color: rgba(255,255,255,0.3)

        .credits
            font-size: 1.5vh
            line-height: 125%
            white-space: nowrap
            color: rgba(255,255,255,0.3)

            .button
                color: rgba(255,255,255,0.3)

    .large-text
        font-size: 2.5vh

        @media only screen and (max-width: 950px)
            br
                display: none

    .flex-wrapper.decor
        display: flex
        flex-direction: column
        justify-content: center

        .name-signature
            width: 20vh

#signature
    .path-1
        stroke-dasharray: 365
        stroke-dashoffset: 365
    
    .path-2
        stroke-dasharray: 85
        stroke-dashoffset: 85

    .path-3
        stroke-dasharray: 45
        stroke-dashoffset: 45

    .path-4
        stroke-dasharray: 180
        stroke-dashoffset: 180

</style>