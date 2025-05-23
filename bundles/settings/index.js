export default [
`
<a id="settingsLink" style="cursor: pointer;"><i class="fa fa-cog" aria-hidden="true"></i></a>
<div id="myModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
          <h2>Settings</h2>
          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <section><div><i class="fa fa-globe" aria-hidden="true"></i> Language</div>
                <select>
                    <option value="en">English</option>
                    <option value="ru">Russian</option>
                </select>
            </section>
            <section><div><i class="fa fa-moon-o" aria-hidden="true"></i> Dark mode</div>
                <input type="checkbox">
            </section>
        </div>
        <div class="modal-footer">
            <button>Apply</button>
        </div>
    </div>
</div>
`,
`
<a id="settingsLink" style="cursor: pointer;"><i class="fa fa-cog" aria-hidden="true"></i></a>
  <div id="myModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Настройки</h2>
          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <section><div><i class="fa fa-globe" aria-hidden="true"></i> Язык</div>
                <select>
                    <option value="en">Английский</option>
                    <option value="ru">Русский</option>
                </select>
            </section>
            <section><div><i class="fa fa-moon-o" aria-hidden="true"></i> Темный режим</div>
                <input type="checkbox">
            </section>
        </div>
        <div class="modal-footer">
            <button>Применить</button>
        </div>
      </div>
  </div>
`
]