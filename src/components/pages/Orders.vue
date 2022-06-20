<template>
  <div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">購買時間</th>
          <th width="180">Email</th>
          <th>購買款項</th>
          <th width="120">應付金額</th>
          <th width="120">是否付款</th>
          <th width="70">編輯</th>
          <th width="70">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2022/3/4</td>
          <td>tina@yahoo.com.tw</td>
          <td>衣服：3件</td>
          <td class="text-end">1334</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked
              />
              <label class="form-check-label" for="flexSwitchCheckDefault"
                >已付款</label
              >
            </div>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm">編輯</button>
          </td>
          <td>
            <button type="button" class="btn btn-outline-secondary btn-sm">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>
