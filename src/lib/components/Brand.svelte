<a href="/" class="brand" aria-label="Rennie Maharaj home">
  <span class="monogram" aria-hidden="true">rm<span>.</span></span>
  <span class="brand-name">Rennie Maharaj<span>Software & systems</span></span>
</a>

<style>
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.85rem;
    flex-shrink: 0;
  }

  .monogram {
    font-size: 2rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.12em;
  }

  .monogram > span {
    color: var(--lime);
  }

  .brand-name {
    font-size: 0.85rem;
    font-weight: 700;
    line-height: 1.5;
  }

  .brand-name > span {
    display: block;
    color: var(--on-dark);
    font-size: 0.7rem;
    font-weight: 500;
  }

  @media (max-width: 420px) {
    .brand-name {
      display: none;
    }
  }
</style>
